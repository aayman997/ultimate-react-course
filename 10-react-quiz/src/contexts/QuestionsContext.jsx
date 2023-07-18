import {useReducer, createContext, useContext, useEffect} from "react";
import Error from "../components/Error";

const QuestionContext = createContext();

const SECS_PER_QUESTION = 30;
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

const QuestionProvider = ({children}) => {
	const [{questions, status, index, answer, points, highScore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);
	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then(res => res.json())
			.then(data => dispatch({type: "dataReceived", payload: data}))
			.catch(() => dispatch({type: "dataFailed"}));
	}, [dispatch]);

	return (
		<QuestionContext.Provider
			value={{
				questions,
				status,
				index,
				answer,
				points,
				highScore,
				secondsRemaining,
				numQuestions,
				maxPossiblePoints,
				dispatch
			}}
		>
			{children}
		</QuestionContext.Provider>
	);
};

const useQuestions = () => {
	const context = useContext(QuestionContext);
	if (context === undefined) {
		throw new Error("QuestionContext was used outside the QuestionProvider");
	}
	return context;
};

export {QuestionProvider, useQuestions};
