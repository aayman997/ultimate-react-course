import { useState, ChangeEvent, FormEventHandler } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser.ts";

function UpdateUserDataForm() {
	// We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
	const { user } = useUser();
	const { email, user_metadata: { fullName: currentFullName } } = user;
	const [fullName, setFullName] = useState(currentFullName);
	const [avatar, setAvatar] = useState<File | null>(null);
	const { updateUser, isUpdating } = useUpdateUser();

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (!fullName) {
			return;
		}
		updateUser({ fullName, avatar }, {
			onSuccess: () => {
				setAvatar(null);
				(e.target as HTMLFormElement).reset();
			}
		});
	};

	const handleCancel = () => {
		setFullName(currentFullName);
		setAvatar(null);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label="Email address">
				<Input value={email} disabled />
			</FormRow>
			<FormRow label="Full name">
				<Input
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					id="fullName"
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Avatar image">
				<FileInput
					type="file"
					id="avatar"
					accept="image/*"
					onChange={(e: ChangeEvent<HTMLInputElement>) => setAvatar(e.target.files?.[0] ?? null)}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow>
				<>
					<Button type="reset" $variation="secondary" disabled={isUpdating} onClick={handleCancel}>
						Cancel
					</Button>
					<Button disabled={isUpdating}>Update account</Button>
				</>
			</FormRow>
		</Form>
	);
}

export default UpdateUserDataForm;
