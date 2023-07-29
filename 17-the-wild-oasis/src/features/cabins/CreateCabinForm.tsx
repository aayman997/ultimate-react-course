import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.tsx";

type Inputs = {
	name: number
	maxCapacity: number
	regularPrice: number
	discount: number
	description: string
	image: FileList
}

function CreateCabinForm() {
	const queryClient = useQueryClient();
	const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<Inputs>();
	const { mutate, isLoading: isCreating, error } = useMutation({
		mutationFn: createCabin,
		onSuccess : () => {
			toast.success("New cabin Successfully created");
			queryClient.invalidateQueries({
				queryKey: ["cabins"]
			});
			reset();
		},
		onError   : (error: Error) => toast.error(error.message)
	});


	const onsubmit: SubmitHandler<Inputs> = (data) => {
		mutate({ ...data, image: data.image.item(0) });
		// console.log(data.image.item(0));
		// console.log(data);
	};

	return (
		<Form onSubmit={handleSubmit(onsubmit)}>
			<FormRow error={errors?.name?.message} label="Cabine name">
				<Input
					type="text" id="name" disabled={isCreating}  {...register("name", {
					required: "This field is required"
				})} />
			</FormRow>

			<FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
				<Input
					type="number" id="maxCapacity" disabled={isCreating} {...register("maxCapacity", {
					required: "This field is required",
					min     : {
						value  : 1,
						message: "Capacity should be at least one"
					}
				})} />
			</FormRow>

			<FormRow error={errors?.regularPrice?.message} label="Regular price">
				<Input
					type="number" id="regularPrice" disabled={isCreating} {...register("regularPrice", {
					required: "This field is required",
					min     : {
						value  : 1,
						message: "Price should be at least one"
					}
				})} />
			</FormRow>

			<FormRow error={errors?.discount?.message} label="Discount">
				<Input
					type="number" id="discount" defaultValue={0} disabled={isCreating}{...register("discount", {
					required: "This field is required",
					validate: (value) => +value <= +getValues().regularPrice || "Discount should be less than regular price"
				})} />
			</FormRow>

			<FormRow error={errors?.description?.message} label="Description for website">
				<Textarea
					type="number" id="description" defaultValue="" disabled={isCreating} {...register("description", {
					required: "This field is required"
				})} />
			</FormRow>

			<FormRow error={errors?.name?.message} label="Cabin photo">
				<FileInput
					id="image" accept="image/*" type="file" {...register("image", {
					required: "This field is required"
				})} />
			</FormRow>

			<FormRow>
				<>
					{/* type is an HTML attribute! */}
					<Button variation="secondary" type="reset">Cancel</Button>
					<Button disabled={isCreating}>Edit cabin</Button>
				</>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
