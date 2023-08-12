import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.ts";
import { useDeleteCabin } from "./useDeleteCabin.ts";
import { NewCabin } from "../../../types/NewCabin.ts";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin.ts";
import Modal from "../../ui/Modal.tsx";
import Table from "../../ui/Table.tsx";
import Menus from "../../ui/Menus.tsx";
import CreateCabinForm from "./CreateCabinForm.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";

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
  font-family: "Sono", sans-serif;
`;

const Price = styled.div`
  font-family: "Sono", sans-serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono", sans-serif;
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
		<Table.Row>
			<Img src={image as unknown as string ?? ""} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity}</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={cabinId} />
					<Menus.List id={cabinId}>
						<Menus.Button icon={<HiSquare2Stack />} onClick={duplicate} isLoading={isCreating}>duplicate</Menus.Button>
						<Modal.Open opens="edit">
							<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
						</Modal.Open>
						<Modal.Open opens="delete">
							<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
						</Modal.Open>
					</Menus.List>
					<Modal.Window name="edit">
						<CreateCabinForm cabinToEdit={cabin} />
					</Modal.Window>

					<Modal.Window name="delete">
						<ConfirmDelete
							resourceName="cabins"
							disabled={isDeleting}
							onConfirm={() => deleteCabin(cabinId)}
						/>
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
};
export default CabinRow;
