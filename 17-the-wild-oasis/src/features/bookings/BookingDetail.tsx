import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking.ts";
import Spinner from "../../ui/Spinner.tsx";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout.ts";
import { useDelete } from "../check-in-out/useDelete.ts";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
	const { isLoading, error, booking } = useBooking();
	const navigate = useNavigate();
	const moveBack = useMoveBack();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeleting } = useDelete();

	const statusToTagName = {
		unconfirmed  : "blue",
		"checked-in" : "green",
		"checked-out": "silver"
	};

	if (isLoading) {
		return <Spinner />;
	}

	const { status, id: bookingId } = booking;

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />
			<Modal>
				<ButtonGroup>
					{status === "unconfirmed" &&
						<Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}
					{status === "unconfirmed" &&
						<Modal.Open opens="delete">
							<Button $variation="danger">Delete booking</Button>
						</Modal.Open>
					}
					{status === "checked-in" &&
						<Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>Check out</Button>}
					<Button $variation="secondary" onClick={moveBack}>
						Back
					</Button>
				</ButtonGroup>
				<Modal.Window name="delete">
					<ConfirmDelete
						resourceName={`booking #${bookingId}`}
						disabled={isDeleting}
						onConfirm={() => deleteBooking(bookingId, {
							onSettled: () => navigate(-1)
						})}
					/>
				</Modal.Window>
			</Modal>
		</>
	);
}

export default BookingDetail;
