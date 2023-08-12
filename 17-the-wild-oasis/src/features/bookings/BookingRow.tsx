import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { BookingType } from "../../../types/Booking.ts";
import Menus from "../../ui/Menus.tsx";
import { HiEye, HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout.ts";
import { useDelete } from "../check-in-out/useDelete.ts";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono", sans-serif;
  font-weight: 500;
`;

interface BookingRowProps {
	booking: BookingType;
}

const BookingRow = (
	{
		booking: {
			id: bookingId,
			startDate,
			endDate,
			numNights,
			totalPrice,
			status,
			guests: { fullName: guestName, email },
			cabins: { name: cabinName }
		}
	}: BookingRowProps
) => {
	const statusToTagName = {
		unconfirmed  : "blue",
		"checked-in" : "green",
		"checked-out": "silver"
	};
	const navigate = useNavigate();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeleting } = useDelete();
	return (
		<Table.Row>
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
        <span>
          {isToday(new Date(startDate))
           ? "Today"
           : formatDistanceFromNow(startDate)}{" "} &rarr; {numNights} night stay
        </span>
				<span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
					{format(new Date(endDate), "MMM dd yyyy")}
        </span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

			<Amount>{formatCurrency(totalPrice)}</Amount>

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={bookingId} />
					<Menus.List id={bookingId}>
						<Menus.Button icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>See details</Menus.Button>
						{status === "unconfirmed" &&
							<Menus.Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Menus.Button>}
						{status === "checked-in" &&
							<Menus.Button icon={<HiArrowUpOnSquare />} onClick={() => checkout(bookingId)} disabled={isCheckingOut}>Check out</Menus.Button>}
						{status === "unconfirmed" &&
							<Modal.Open opens="delete">
								<Menus.Button icon={<HiTrash />} disabled={isDeleting}>Delete booking</Menus.Button>
							</Modal.Open>}
					</Menus.List>
					<Modal.Window name="delete">
						<ConfirmDelete
							resourceName={`booking #${bookingId}`}
							disabled={isDeleting}
							onConfirm={() => deleteBooking(bookingId)}
						/>
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
};

export default BookingRow;
