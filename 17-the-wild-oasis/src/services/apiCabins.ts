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

interface NewCabin {
	id?: number;
	image: string;
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	description: string;
}

export const createEditCabin = async (newCabin: NewCabin, id?: number) => {
	console.log(newCabin);
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
	const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
	const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create/Edit cabin
	let query = supabase.from("cabins");


	// A) CREATE
	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}

	// A) EDIT
	if (id) {
		query = query
			.update({ ...newCabin, image: imagePath })
			.eq("id", id)
			.select();
	}

	const { data, error } = await query.select().single();

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


