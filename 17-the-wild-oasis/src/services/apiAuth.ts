import supabase from "./supabase.ts";
import { UserType } from "../../types/UserType.ts";

export const login = async ({ email, password }: UserType) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const getCurrentUser = async () => {
	const { data: session } = await supabase.auth.getSession();
	if (!session || !session?.session) {
		return null;
	}

	const { data, error } = await supabase.auth.getUser();

	if (error) {
		throw new Error(error.message);
	}

	console.log("logged user", data);

	return data?.user;
};
