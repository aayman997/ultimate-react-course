import styled from "styled-components";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
	{
		duration: "1 night",
		value   : 0,
		color   : "#EF4444"
	},
	{
		duration: "2 nights",
		value   : 0,
		color   : "#F97316"
	},
	{
		duration: "3 nights",
		value   : 0,
		color   : "#EAB308"
	},
	{
		duration: "4-5 nights",
		value   : 0,
		color   : "#84CC16"
	},
	{
		duration: "6-7 nights",
		value   : 0,
		color   : "#22C55E"
	},
	{
		duration: "8-14 nights",
		value   : 0,
		color   : "#14B8A6"
	},
	{
		duration: "15-21 nights",
		value   : 0,
		color   : "#3B82F6"
	},
	{
		duration: "21+ nights",
		value   : 0,
		color   : "#A855F7"
	}
];

const startDataDark = [
	{
		duration: "1 night",
		value   : 0,
		color   : "#B91C1C"
	},
	{
		duration: "2 nights",
		value   : 0,
		color   : "#C2410C"
	},
	{
		duration: "3 nights",
		value   : 0,
		color   : "#A16207"
	},
	{
		duration: "4-5 nights",
		value   : 0,
		color   : "#4D7C0F"
	},
	{
		duration: "6-7 nights",
		value   : 0,
		color   : "#15803D"
	},
	{
		duration: "8-14 nights",
		value   : 0,
		color   : "#0F766E"
	},
	{
		duration: "15-21 nights",
		value   : 0,
		color   : "#1D4ED8"
	},
	{
		duration: "21+ nights",
		value   : 0,
		color   : "#7E22CE"
	}
];

function prepareData(startData, stays) {
	// A bit ugly code, but sometimes this is what it takes when working with real data 😅

	function incArrayValue(arr, field) {
		return arr.map((obj) =>
			obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
		);
	}

	const data = stays
		.reduce((arr, cur) => {
			const num = cur.numNights;
			if (num === 1) {
				return incArrayValue(arr, "1 night");
			}
			if (num === 2) {
				return incArrayValue(arr, "2 nights");
			}
			if (num === 3) {
				return incArrayValue(arr, "3 nights");
			}
			if ([4, 5].includes(num)) {
				return incArrayValue(arr, "4-5 nights");
			}
			if ([6, 7].includes(num)) {
				return incArrayValue(arr, "6-7 nights");
			}
			if (num >= 8 && num <= 14) {
				return incArrayValue(arr, "8-14 nights");
			}
			if (num >= 15 && num <= 21) {
				return incArrayValue(arr, "15-21 nights");
			}
			if (num >= 21) {
				return incArrayValue(arr, "21+ nights");
			}
			return arr;
		}, startData)
		.filter((obj) => obj.value > 0);

	return data;
}
