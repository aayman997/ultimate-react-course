import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking.ts";
import Spinner from "../../ui/Spinner.tsx";
import BookingDataBox from "../bookings/BookingDataBox.tsx";
import { useState, useEffect } from "react";
import Checkbox from "../../ui/Checkbox.tsx";
import { formatCurrency } from "../../utils/helpers.ts";
import { useCheckin } from "./useCheckin.ts";
import { useSetting } from "../settings/useSetting.ts";
import { BookingType } from "../../../types/Booking.ts";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { booking, isLoading } = useBooking();
	const { settings, isLoading: isLoadingSettings } = useSetting();
	const moveBack = useMoveBack();
	const { checkin, isCheckingIn } = useCheckin();
	useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);
	let optionalBreakfastPrice: number = 0;
	if (isLoading || isLoadingSettings) {
		return <Spinner />;
	}

	const {
		id: bookingId,
		guests,
		totalPrice,
		numGuests,
		hasBreakfast,
		numNights
	} = booking as BookingType;

	if (settings) {
		optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;
	}

	function handleCheckin() {
		if (!confirmPaid) {
			return;
		}
		if (addBreakfast) {
			checkin({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice : optionalBreakfastPrice,
					totalPrice  : totalPrice + optionalBreakfastPrice
				}
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking as BookingType} />
			{!hasBreakfast && <Box>
				<Checkbox
					id="breakfast"
					checked={addBreakfast} onChange={() => {
					setAddBreakfast(add => !add);
					setConfirmPaid(false);
				}}
				>Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?</Checkbox>
			</Box>}
			<Box>
				<Checkbox
					id="confirm"
					checked={confirmPaid}
					onChange={() => setConfirmPaid(confirm => !confirm)}
					disabled={confirmPaid || isCheckingIn}
				>I confirm that {guests.fullName} has paid the total amount of
					{
						!addBreakfast
						? ` ${formatCurrency(totalPrice)}`
						: ` ${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`
					}</Checkbox>
			</Box>
			<ButtonGroup>
				<Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
				<Button $variation="secondary" onClick={moveBack}>Back</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
