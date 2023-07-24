// Test ID: IIDSAT

import { calcMinutesLeft, formatCurrency, formatDate } from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant.js";
import { useLoaderData } from "react-router-dom";

function Order() {
	// Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
	const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = useLoaderData();
	const deliveryIn = calcMinutesLeft(estimatedDelivery);

	return (
		<div>
			<div>
				<h2>Status</h2>

				<div>
					{priority && <span>Priority</span>}
					<span>{status} order</span>
				</div>
			</div>

			<div>
				<p>{deliveryIn >= 0 ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃` : "Order should have arrived"}</p>
				<p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
			</div>

			<div>
				<p>Price pizza: {formatCurrency(orderPrice)}</p>
				{priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
				<p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
			</div>
		</div>
	);
}

export const loader = async ({ params }) => {
	/** @namespace params.orderId **/
	return await getOrder(params.orderId);
};

export default Order;
