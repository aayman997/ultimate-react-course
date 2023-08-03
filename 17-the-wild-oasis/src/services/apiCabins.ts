import supabase, { supabaseUrl } from "./supabase.ts";
import { NewCabin } from "../../types/NewCabin.ts";

export const getCabins = async () => {
	const { data, error } = await supabase
		.from("cabins")
		.select("*")
		.order("name");
	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
	return data;
};

export const createEditCabin = async (newCabin: NewCabin, id?: number) => {
	const hasImagePath: boolean = newCabin.image?.startsWith?.(supabaseUrl);
	const imageName: string = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
	const imagePath: FileList | File | string = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	// 1. Create/Edit cabin
	// let query = supabase.from("cabins");
	let query;
	let data;
	let error;

	// A) CREATE
	if (!id) {
		query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath as string }]);
	}

	// A) EDIT
	if (id) {
		query = supabase
			.from("cabins")
			.update({ ...newCabin, image: imagePath as string })
			.eq("id", id)
			.select();
	}
	if (query) {
		({ data, error } = await query.select().single());
	}

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be created");
	}

	// 2. Upload Image
	if (hasImagePath) {
		return data;
	}
	const { error: storageError } = await supabase
		.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image as Blob);

	// 3. Delete the cabin if there was an error uploading the image
	if (storageError && data) {
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


