import { useNavigate, useRouteError } from "react-router-dom";
import { LinkButton } from "./LinkButton.jsx";

function ErrorPage() {
	const error = useRouteError();
	return (
		<div>
			<h1>Something went wrong 😢</h1>
			<p>{error.data || error.message}</p>
			<LinkButton to="-1">&larr; Back to menu</LinkButton>
		</div>
	);
}

export default ErrorPage;
