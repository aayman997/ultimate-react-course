import {useEffect, useReducer} from "react";
import Error from "./components/Error";
import {FinishScreen} from "./components/FinishScreen";
import {Footer} from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import {NextButton} from "./components/NextButton";
import {Progress} from "./components/Progress";
import {Question} from "./components/Question";
import {StartScreen} from "./components/StartScreen";
import {Timer} from "./components/Timer";

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status          : "loading",
    index           : 0,
    answer          : null,
    points          : 0,
    highScore       : 0,
    secondsRemaining: null
};
const SECS_PER_QUESTION = 30;

const reducer = (state, action) => {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status   : "ready"
            };
        case "dataFailed":
            return {
                ...state,
                status: "error"
            };
        case "start":
            return {
                ...state,
                status          : "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION
            };
        case "newAnswer":
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + 1 : state.points
            };
        case "nextQuestion":
            return {
                ...state,
                index : state.index + 1,
                answer: null
            };
        case "finish":
            return {
                ...state,
                status   : "finished",
                highScore: state.points > state.highScore ? state.points : state.highScore
            };
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status   : "ready"
            };
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status          : state.secondsRemaining === 0 ? "finished" : state.status
            };
        default:
            throw new Error("Action Unknown");
    }
};

const App = () => {
    const [{questions, status, index, answer, points, highScore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);
    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then(res => res.json())
            .then(data => dispatch({type: "dataReceived", payload: data}))
            .catch(() => dispatch({type: "dataFailed"}));
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
                {status === "active" && (
                    <>
                        <Progress numQuestions={numQuestions} index={index} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
                        <Question question={questions.at(index)} dispatch={dispatch} answer={answer} />
                        <Footer>
                            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
                        </Footer>
                    </>
                )}
                {status === "finished" && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highScore={highScore} dispatch={dispatch} />}
            </Main>
        </div>
    );
};

export default App;