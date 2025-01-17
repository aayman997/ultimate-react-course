import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import FormRow from "../../ui/FormRow.tsx";
import { useCreateCabin } from "./useCreateCabin.ts";
import { useEditCabin } from "./useEditCabin.ts";
import { NewCabin } from "../../../types/NewCabin.ts";

interface cabinToEdit extends NewCabin {
	id: number;
}

interface CreateCabinFormProps {
	cabinToEdit?: cabinToEdit | object;
	onCloseModal?: () => void;
}

const CreateCabinForm = ({ cabinToEdit = {}, onCloseModal }: CreateCabinFormProps) => {
	const { createCabin, isCreating } = useCreateCabin();
	const { editCabin, isEditing } = useEditCabin();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);
	const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<cabinToEdit>({
		defaultValues: isEditSession ? editValues : {}
	});


	const isWorking = isCreating || isEditing;


	const onsubmit: SubmitHandler<cabinToEdit> = (data) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const image = typeof data.image === "string" ? data?.image : data?.image?.item(0) as File;
		if (isEditSession) {
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					}
				}
			);
		} else {
			createCabin(
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					}
				}
			);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onsubmit)} type={onCloseModal ? "modal" : "regular"}>
			<FormRow error={errors?.name?.message} label="Cabine name">
				<Input
					type="text" id="name" disabled={isWorking}  {...register("name", {
					required: "This field is required"
				})} />
			</FormRow>

			<FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
				<Input
					type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity", {
					required: "This field is required",
					min     : {
						value  : 1,
						message: "Capacity should be at least one"
					}
				})} />
			</FormRow>

			<FormRow error={errors?.regularPrice?.message} label="Regular price">
				<Input
					type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", {
					required: "This field is required",
					min     : {
						value  : 1,
						message: "Price should be at least one"
					}
				})} />
			</FormRow>

			<FormRow error={errors?.discount?.message} label="Discount">
				<Input
					type="number" id="discount" defaultValue={0} disabled={isWorking}{...register("discount", {
					required: "This field is required",
					validate: (value) => +value <= +getValues().regularPrice || "Discount should be less than regular price"
				})} />
			</FormRow>

			<FormRow error={errors?.description?.message} label="Description for website">
				<Textarea
					type="number" id="description" defaultValue="" disabled={isWorking} {...register("description", {
					required: "This field is required"
				})} />
			</FormRow>

			<FormRow error={errors?.name?.message} label="Cabin photo">
				<FileInput
					id="image" accept="image/*" type="file" {...register("image", {
					required: isEditSession ? false : "This field is required"
				})} />
			</FormRow>

			<FormRow>
				<>
					{/* type is an HTML attribute! */}
					<Button $variation="secondary" type="reset" onClick={() => onCloseModal?.()}>Cancel</Button>
					<Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "create new cabin"}</Button>
				</>
			</FormRow>
		</Form>
	);
};

export default CreateCabinForm;
