import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSetting } from "./useSetting.ts";
import Form from "../../ui/Form.tsx";
import Spinner from "../../ui/Spinner.tsx";
import { useUpdateSetting } from "./useUpdateSetting.ts";
import React from "react";

function UpdateSettingsForm() {
	const {
		isLoading,
		error,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice
		} = {}
	} = useSetting();
	const { isUpdating, updateSetting } = useUpdateSetting();

	if (isLoading) {
		return <Spinner />;
	}

	const handleUpdate = (e: React.FocusEvent<HTMLInputElement>, field: string) => {
		const { value } = e.target;
		if (!value) {
			return;
		}
		updateSetting({ [field]: value });
	};
	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					onBlur={e => handleUpdate(e, "minBookingLength")}
					disabled={isUpdating}
				/>
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					onBlur={e => handleUpdate(e, "maxBookingLength")}
					disabled={isUpdating}
				/>
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking}
					onBlur={e => handleUpdate(e, "maxGuestsPerBooking")}
					disabled={isUpdating}
				/>
			</FormRow>

			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					onBlur={e => handleUpdate(e, "breakfastPrice")}
					disabled={isUpdating}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
