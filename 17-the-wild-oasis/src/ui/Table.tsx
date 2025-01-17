import styled from "styled-components";
import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { NewCabin } from "../../types/NewCabin.ts";
import { BookingType } from "../../types/Booking.ts";

interface CommonRowProps {
	$columns: string;
}

type TableContextType = {
	columns?: string;
	$columns: string;
};

interface BaseTableType {
	children: ReactNode;
}

interface TableType extends BaseTableType {
	$columns: string;
}


interface CabinType extends NewCabin {
	id?: number;
	image: string;
}

interface BodyTypes {
	data: CabinType[] | BookingType[] | [];
	render: (cabins: CabinType | BookingType) => React.JSX.Element;
}

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext<TableContextType>({} as TableContextType);

const Table = ({ $columns, children }: TableType) => {
	const value = useMemo(() => {
		return {
			$columns
		};

	}, [$columns]);
	return (
		<TableContext.Provider value={value}>
			<StyledTable role="table">{children}</StyledTable>
		</TableContext.Provider>
	);
};

const Header = ({ children }: BaseTableType) => {
	const { $columns } = useContext(TableContext);
	return <StyledHeader role="row" $columns={$columns} as="header">{children}</StyledHeader>;
};

const Row = ({ children }: BaseTableType) => {
	const { $columns } = useContext(TableContext);
	return <StyledRow role="row" $columns={$columns}>{children}</StyledRow>;
};

const Body = ({ data, render }: BodyTypes) => {
	if (!data.length) {
		return <Empty>No data to show at the moment</Empty>;
	}
	return (
		<StyledBody>{data.map(render)}</StyledBody>
	);
};
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
export default Table;
