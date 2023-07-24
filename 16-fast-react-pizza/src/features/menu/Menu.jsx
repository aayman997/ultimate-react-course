import { getMenu } from "../../services/apiRestaurant.js";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem.jsx";

function Menu() {
	const menu = useLoaderData();
	console.log(menu);

	return (
		<ul>
			{menu.map((pizza) => (
				<MenuItem pizza={pizza} key={pizza.id} />
			))}
		</ul>
	);
}

export const loader = async () => {
	return await getMenu();
};

export default Menu;
