import styled from "styled-components";
import { ChangeEvent } from "react";

interface StyledSelectTypes {
	type?: string;
}

type OptionType = {
	value: string
	label: string
}

interface SelectTypes {
	options: OptionType[];
	value?: string;
	type?: "white";
	onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const StyledSelect = styled.select<StyledSelectTypes>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid ${(props) =>
          props.type === "white"
          ? "var(--color-grey-100)"
          : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
const Select = ({ options, value, onChange, ...props }: SelectTypes) => {
	return (
		<StyledSelect value={value} {...props} onChange={onChange}>
			{options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
		</StyledSelect>
	);
};
export default Select;
