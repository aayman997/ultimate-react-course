import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty.tsx";
import { useBookings } from "./useBookings.ts";
import Spinner from "../../ui/Spinner.tsx";
import BookingRow from "./BookingRow.tsx";
import Pagination from "../../ui/Pagination.tsx";
import { BookingType } from "../../../types/Booking.ts";

function BookingTable() {
	const { isLoading, error, bookings, count } = useBookings();

	if (isLoading) {
		return <Spinner />;
	}

	if (!bookings?.length || error) {
		return <Empty resourceName="bookings" />;
	}
	return (
		<Menus>
			<Table $columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div />
				</Table.Header>

				<Table.Body
					data={bookings}
					render={(booking) => (
						<BookingRow key={booking.id} booking={booking as BookingType} />
					)}
				/>
				<Table.Footer>
					<Pagination count={count as number} />
				</Table.Footer>
			</Table>
		</Menus>
	);
}

export default BookingTable;
