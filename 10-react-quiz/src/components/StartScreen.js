import {useQuestions} from "../contexts/QuestionsContext";

export const StartScreen = () => {
	const {dispatch, questions, numQuestions} = useQuestions();

	return (
		<div className="start">
			<h2>Welcome to the React Quiz!</h2>
			<h3>{numQuestions} question to start your React mastery</h3>
			<button className="btn btn-ui" onClick={() => dispatch({type: "start"})}>Let"s start</button>
		</div>
	);
};
