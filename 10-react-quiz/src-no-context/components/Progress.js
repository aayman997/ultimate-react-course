export const Progress = ({index, numQuestions, points, maxPossiblePoints, answer}) => {
	return (
		<header className="progress">
			<progress max={numQuestions} value={index + Number(answer !== null)}></progress>
			<p>Question <strong>{index}</strong> / <strong>{numQuestions}</strong></p>
			<p><strong>{points}</strong> / <strong>{maxPossiblePoints}</strong></p>
		</header>
	);
};
