import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.ts";
import StyledButton from "../../ui/Button.tsx";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm.tsx";
import Row from "../../ui/Row.tsx";
import { useDeleteCabin } from "./useDeleteCabin.ts";
import { NewCabin } from "../../../types/NewCabin.ts";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin.ts";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinType extends NewCabin {
	id: number;
	image: string;
}

interface CabinProps {
	cabin: CabinType;
}

const CabinRow = ({ cabin }: CabinProps) => {
	const { isDeleting, deleteCabin } = useDeleteCabin();
	const [showForm, setShowForm] = useState(false);
	const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;
	const { isCreating, createCabin } = useCreateCabin();

	const duplicate = () => {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description
		});
	};

	return (
		<>
			<TableRow role="row">
				<Img src={image ?? undefined} />
				<Cabin>{name}</Cabin>
				<div>Fits up to {maxCapacity}</div>
				<Price>{formatCurrency(regularPrice)}</Price>
				{discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
				<Row type="horizontal">
					<StyledButton variation="primary" size="small" onClick={duplicate} disabled={isCreating}>
						<HiSquare2Stack />
					</StyledButton>
					<StyledButton variation="secondary" size="small" onClick={() => setShowForm(show => !show)} disabled={isDeleting}>
						<HiPencil />
					</StyledButton>
					<StyledButton variation="danger" size="small" onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
						<HiTrash />
					</StyledButton>
				</Row>
			</TableRow>
			{showForm && <CreateCabinForm cabinToEdit={cabin} />}
		</>
	);
};
export default CabinRow;
