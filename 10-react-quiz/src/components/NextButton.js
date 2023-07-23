import {useQuestions} from "../contexts/QuestionsContext";

export const NextButton = () => {
	const {dispatch, index, answer, questions, numQuestions} = useQuestions();


	if (answer === null) {
		return null;
	}
	if (index < numQuestions - 1) {
		return (
			<button className="btn btn-ui" onClick={() => dispatch({type: "nextQuestion"})}>Next</button>
		);
	}
	if (index === numQuestions - 1) {
		return (
			<button className="btn btn-ui" onClick={() => dispatch({type: "finish"})}>Finish</button>
		);
	}
};
