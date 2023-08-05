import Select from "./Select.tsx";
import { useSearchParams } from "react-router-dom";
import { ChangeEvent } from "react";

type OptionType = { value: string, label: string }

interface SortByTypes {
	options: OptionType[];
}

const SortBy = ({ options }: SortByTypes) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentValue = searchParams.get("sortBy") ?? "";
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	};
	return (
		<Select options={options} type="white" value={currentValue} onChange={handleChange} />
	);
};
export default SortBy;
