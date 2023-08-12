import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading.tsx";
import { AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { eachDayOfInterval, subDays, format, isSameDay } from "date-fns";
import { BookingType } from "../../../types/Booking.ts";
import { useDarkMode } from "../../context/useDarkMode.ts";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

interface SalesChartProps {
	bookings: BookingType[];
	numDays: number;
}

const SalesChart = ({ bookings, numDays }: SalesChartProps) => {
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end  : new Date()
	});

	const data = allDates.map(date => {
		return {
			label      : format(date, "MMM dd"),
			totalSales : bookings.filter(booking => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + cur.totalPrice, 0),
			extrasSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + (cur.extrasPrice as number), 0)
		};
	});

	const { isDarkMode } = useDarkMode();
	const colors =
		isDarkMode
		? {
				totalSales : { stroke: "#4F46E5", fill: "#4F46E5" },
				extrasSales: { stroke: "#22C55E", fill: "#22C55E" },
				text       : "#E5E7EB",
				background : "#18212F"
			}
		: {
				totalSales : { stroke: "#4F46E5", fill: "#C7D2FE" },
				extrasSales: { stroke: "#16A34A", fill: "#DCFCE7" },
				text       : "#374151",
				background : "#FFF"
			};


	return (
		<StyledSalesChart>
			<Heading as="h2">Sales from {format(allDates.at(0) as Date, "MMM dd yyy")} &mdash; {format(allDates.at(-1) as Date, "MMM dd yyy")}</Heading>
			<ResponsiveContainer height={300} width="100%">
				<AreaChart data={data}>
					<XAxis dataKey="label" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
					<YAxis unit="$" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
					<CartesianGrid strokeDasharray="4" />
					<Tooltip contentStyle={{ backgroundColor: colors.background }} />
					<Area
						dataKey="totalSales"
						type="monotone"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth={2} name="Total sales"
						unit="$"
					/>
					<Area
						dataKey="extrasSales"
						type="monotone"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth={2} name="Extras sales"
						unit="$"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
};
export default SalesChart;
