import { Link } from "react-router-dom";
import { SearchOrder } from "../features/order/SearchOrder.jsx";

export const Header = () => {
	return (
		<header className="bg-yellow-500">
			<Link to="/">Fast React Pizza co.</Link>
			<SearchOrder />
			<p>Jonas</p>
		</header>
	);
};
