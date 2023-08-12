import Stat from "./Stat.tsx";
import { HiOutlineBriefcase, HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers.ts";
import { BookingType } from "../../../types/Booking.ts";

interface StatsProps {
	bookings: BookingType[];
	confirmedStays: BookingType[];
	numDays: number;
	cabinCount: number;
}

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) => {
	// 1.
	const numBookings = bookings.length;
	// 2.
	const sales = bookings.reduce((acc: number, cur: { totalPrice: number }) => acc + cur.totalPrice, 0);
	// 3.
	const checkIns = confirmedStays.length;
	// 4.
	const occupation = confirmedStays.reduce((acc: number, cur: { numNights: number }) => acc + cur.numNights, 0) / (numDays * cabinCount);

	return (
		<>
			<Stat value={numBookings} title="bookings" color="blue" icon={<HiOutlineBriefcase />} />
			<Stat value={formatCurrency(sales)} title="Sales" color="green" icon={<HiOutlineBanknotes />} />
			<Stat value={checkIns} title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} />
			<Stat value={Math.round(occupation * 100) + "%"} title="Occupancy rate" color="yellow" icon={<HiOutlineChartBar />} />
		</>
	);
};
export default Stats;
