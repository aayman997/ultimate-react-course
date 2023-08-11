import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserType } from "../../../types/UserType.ts";
import { useSignup } from "./useSignup.ts";
import SpinnerMini from "../../ui/SpinnerMini.tsx";

// Email regex: /\S+@\S+\.\S+/

interface CreateUserType extends UserType {
	fullName: string;
	passwordConfirm: string;
}

function SignupForm() {
	const { register, formState, getValues, handleSubmit, reset } = useForm<CreateUserType>();
	const { errors } = formState;
	const { singUp, isLoading } = useSignup();
	const onSubmit: SubmitHandler<CreateUserType> = ({ fullName, email, password }) => {
		singUp(
			{ fullName, email, password },
			{
				onSettled: () => reset()
			}
		);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Full name" error={errors?.fullName?.message}>
				<Input
					disabled={isLoading}
					type="text" id="fullName"
					{...register("fullName", { required: "This fields is required" })} />
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					disabled={isLoading}
					type="email" id="email"
					{...register(
						"email",
						{
							required: "This fields is required",
							pattern : {
								value  : /\S+@\S+\.\S+/,
								message: "Please provide a valid email address"
							}
						}
					)} />
			</FormRow>

			<FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
				<Input
					disabled={isLoading}
					type="password" id="password"
					{...register(
						"password",
						{
							required : "This fields is required",
							minLength: {
								value  : 8,
								message: "Password need a minimum of 8 characters"
							}
						}
					)} />
			</FormRow>

			<FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
				<Input
					disabled={isLoading}
					type="password" id="passwordConfirm"
					{...register(
						"passwordConfirm",
						{
							required: "This fields is required",
							validate: (value) => value === getValues().password || "Password need to match"
						}
					)} />
			</FormRow>

			<FormRow>
				<>
					{/* type is an HTML attribute! */}
					<Button $variation="secondary" type="reset" disabled={isLoading} onClick={() => reset()}>Cancel</Button>
					<Button disabled={isLoading}>{!isLoading ? "Create new user" : <SpinnerMini />}</Button>
				</>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
