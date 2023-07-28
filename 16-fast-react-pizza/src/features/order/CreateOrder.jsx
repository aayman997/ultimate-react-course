// https://uibakery.io/regex-library/phone-number
import { Form, useNavigation, useActionData, redirect } from "react-router-dom";
import { Button } from "../../ui/Button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getUser, fetchAddress } from "../user/userSlice.js";
import { getCart, clearCart, getTotalCartPrice } from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import { createOrder } from "../../services/apiRestaurant.js";
import store from "../../store.js";
import { formatCurrency } from "../../utils/helpers.js";
import { useState } from "react";

const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

function CreateOrder() {
	const { username, status: addressStatus, position, address, error: errorAddress } = useSelector(getUser);
	const isLoadingAddress = addressStatus === "loading";
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	const [withPriority, setWithPriority] = useState(false);
	const cart = useSelector(getCart);
	const totalCartPrice = useSelector(getTotalCartPrice);
	const dispatch = useDispatch();
	const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
	const totalPrice = totalCartPrice + priorityPrice;
	const formErros = useActionData();

	if (cart.length === 0) return <EmptyCart />;

	return (
		<div className="px-4 py-6">
			<h2 className="mb-4 text-xl font-semibold">Ready to order? Let's go!</h2>

			<Form method="POST">
				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-40">First Name</label>
					<input className="input grow" type="text" name="customer" defaultValue={username} required />
				</div>

				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-40">Phone number</label>
					<div className="grow">
						<input className="input w-full" type="tel" name="phone" required />
						{formErros?.phone && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{formErros.phone}</p>}
					</div>
				</div>

				<div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-40">Address</label>
					<div className="grow">
						<input className="input w-full" type="text" name="address" disabled={isLoadingAddress} defaultValue={address} required />
						{addressStatus === "error" && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{errorAddress}</p>}
					</div>
					{!position.latitude && !position.longitude && (
						<span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
							<Button
								type="small"
								disabled={isLoadingAddress}
								onClick={(e) => {
									e.preventDefault();
									dispatch(fetchAddress());
								}}
							>
								<img src="/location-crosshairs-solid.svg" className="mr-2 inline-block h-5 w-5 align-middle" alt="location icon" />
								<span className="inline-block align-middle">Get Position</span>
							</Button>
						</span>
					)}
				</div>

				<div className="mb-12 flex items-center gap-5">
					<input
						type="checkbox"
						name="priority"
						id="priority"
						value={withPriority}
						onChange={(e) => setWithPriority(e.target.checked)}
						className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring
						focus:ring-yellow-400 focus:ring-offset-2"
					/>
					<label htmlFor="priority" className="font-medium">
						Want to yo give your order priority?
					</label>
				</div>

				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<input type="hidden" name="cart" value={JSON.stringify(cart)} />
					<input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude}, ${position.longitude}` : ""} />
					<Button type="primary" disabled={isSubmitting || isLoadingAddress}>
						{isSubmitting ? "Placing order...." : `Order now for ${formatCurrency(totalPrice)}`}
					</Button>
				</div>
			</Form>
		</div>
	);
}

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const order = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === "true",
	};
	const errors = {};

	if (!isValidPhone(order.phone)) {
		errors.phone = "Please give us your correct phone number. We might need it to contact you.";
	}

	if (Object.keys(errors).length > 0) return errors;

	const newOrder = await createOrder(order);

	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
