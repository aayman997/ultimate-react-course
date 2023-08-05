import Modal from "../../ui/Modal.tsx";
import CreateCabinForm from "./CreateCabinForm.tsx";
import Button from "../../ui/Button.tsx";

const AddCabin = () => {
	return (
		<Modal>
			<Modal.Open opens="create">
				<Button>Add new cabin</Button>
			</Modal.Open>
			<Modal.Window name="create">
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
};
export default AddCabin;
