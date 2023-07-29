import supabase from "./supabase.ts";

export const getCabins = async () => {

	const { data, error } = await supabase
		.from("cabins")
		.select("*");
	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
	return data;
};
