import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings.ts";
import Spinner from "../../ui/Spinner.tsx";
import { useRecentStays } from "./useRecentStays.ts";
import Stats from "./Stats.tsx";
import { useCabins } from "../cabins/useCabins.ts";
import SalesChart from "./SalesChart.tsx";
import DurationChart from "./DurationChart.tsx";
import TodayActivity from "../check-in-out/TodayActivity.tsx";
import { BookingType } from "../../../types/Booking.ts";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const DashboardLayout = () => {
	const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
	const { isLoading: isLoadingStays, confirmedStays, numDays } = useRecentStays();
	const { isLoading: isLoadingCabins, cabins } = useCabins();
	if (isLoadingBookings || isLoadingStays || isLoadingCabins) {
		return <Spinner />;
	}

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings as BookingType[]} confirmedStays={confirmedStays as BookingType[]} numDays={numDays} cabinCount={cabins?.length as number}
			/>
			<TodayActivity />
			<DurationChart confirmedStays={confirmedStays as BookingType[]} />
			<SalesChart bookings={bookings as BookingType[]} numDays={numDays} />
		</StyledDashboardLayout>
	);
};
export default DashboardLayout;
