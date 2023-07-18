import {useEffect} from "react";
import {useQuestions} from "../contexts/QuestionsContext";

export const Timer = () => {
	const {secondsRemaining, dispatch} = useQuestions();

	const mins = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;
	useEffect(() => {
		const id = setInterval(() => {
			dispatch({type: "tick"});
		}, 1000);
		return () => clearInterval(id);
	}, [dispatch]);
	return (
		<div className="timer">
			{mins < 10 && "0"}
			{mins}
			:
			{seconds < 0 && "0"}
			{seconds}
		</div>
	);
};
