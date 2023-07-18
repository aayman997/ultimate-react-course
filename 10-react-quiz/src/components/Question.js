import {Options} from "./Options";
import {useQuestions} from "../contexts/QuestionsContext";

export const Question = () => {
	const {questions, index} = useQuestions();
	const question = questions.at(index);
	return (
		<div>
			<h4>{question.question}</h4>
			<Options question={question} />
		</div>
	);
};
