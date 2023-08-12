import supabase from "./supabase";

interface SettingsType {
	created_at: string;
	id: number;
	breakfastPrice: number;
	maxBookingLength: number;
	maxGuestsPerBooking: number;
	minBookingLength: number;
}

export const getSettings = async (): Promise<SettingsType> => {
	const { data, error } = await supabase.from("settings").select("*").single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}

	return data as SettingsType;
};

// We expect a newSetting object that looks like {setting: newValue}
export const updateSetting = async (newSetting: object): Promise<SettingsType> => {
	const { data, error } = await supabase
		.from("settings")
		.update(newSetting)
		// There is only ONE row of settings, and it has the ID=1, and so this is the updated one
		.eq("id", 1)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be updated");
	}
	return data;
};
