import { Button } from "../../ui/Button.jsx";
import CartItem from "./CartItem.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart } from "./cartSlice.js";
import { getUser } from "../user/userSlice.js";
import EmptyCart from "./EmptyCart.jsx";

function Cart() {
	const { username } = useSelector(getUser);
	const cart = useSelector(getCart);
	const dispatch = useDispatch();
	if (!cart.length) return <EmptyCart />;

	return (
		<div className="px-4 py-3">
			{/*<LinkButton to="/menu">&larr; Back to menu</LinkButton>*/}
			<Button to="/menu">&larr; Back to menu</Button>
			<h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

			<ul className="mt-3 divide-y divide-stone-200 border-b">
				{cart.map((item) => (
					<CartItem item={item} key={item.pizzaId} />
				))}
			</ul>

			<div className="mt-6 space-x-2">
				<Button to="/order/new" type="primary">
					Order pizzas
				</Button>
				<Button type="secondary" onClick={() => dispatch(clearCart())}>
					Clear cart
				</Button>
			</div>
		</div>
	);
}

export default Cart;
