import supabase, { supabaseUrl } from "./supabase.ts";

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


export const createCabin = async (newCabin) => {
	const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create cabin
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be created");
	}

	// 2. Upload Image
	const { error: storageError } = await supabase
		.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	// 3. Delete the cabin if there was an error uploading the image
	if (storageError) {
		await supabase
			.from("cabins")
			.delete()
			.eq("id", data.id);
		console.error(storageError);
		throw new Error("Cabin image could not be uploaded and the cabin was not created");
	}
	return data;
};

export const updateCabin = async (newCabin) => {

	const { data, error } = await supabase
		.from("cabins")
		.update({ other_column: "otherValue" })
		.eq("some_column", "someValue")
		.select();

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be updated");
	}
	return data;
};

export const deleteCabin = async (id: number) => {
	const { data, error } = await supabase
		.from("cabins")
		.delete()
		.eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be deleted");
	}
	return data;
};


