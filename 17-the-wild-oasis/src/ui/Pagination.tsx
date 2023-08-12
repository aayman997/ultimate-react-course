import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import Row from "./Row.tsx";
import { PAGE_SIZE } from "../utils/constants.ts";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

interface PaginationButtonProps {
	active?: boolean;
}

const PaginationButton = styled.button<PaginationButtonProps>`
  background-color: ${(props) =>
          props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface PaginationType {
	count: number;
}

const Pagination = ({ count }: PaginationType) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
	const pageCount = Math.ceil(count / PAGE_SIZE);
	const nextPage = () => {
		const next = currentPage === pageCount ? currentPage : currentPage + 1;
		searchParams.set("page", next.toString());
		setSearchParams(searchParams);
	};
	const previousPage = () => {
		const prev = currentPage === 1 ? currentPage : currentPage - 1;
		searchParams.set("page", prev.toString());
		setSearchParams(searchParams);
	};

	if (pageCount <= 1) {
		return null;
	}

	return (
		<StyledPagination>
			<Row type="horizontal" $gap="3px">
				<span>Showing</span>
				<span>{(currentPage - 1) * PAGE_SIZE + 1}</span>
				<span>to</span>
				<span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span>
				<span>of</span>
				<span>{count}</span>
				<span>results</span>
			</Row>
			<Buttons>
				<PaginationButton onClick={previousPage} disabled={currentPage === 1}>
					<HiChevronLeft />
					<span>Previous</span>
				</PaginationButton>
				<PaginationButton onClick={nextPage} disabled={currentPage === pageCount}>
					<span>Next</span>
					<HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
};
export default Pagination;
