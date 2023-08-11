import supabase, { supabaseUrl } from "./supabase.ts";
import { UserType } from "../../types/UserType.ts";

interface CreateUserType extends UserType {
	fullName: string;
}

export const singUp = async ({ fullName, email, password }: CreateUserType) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: ""
			}
		}
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

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
	if (!session?.session) {
		return null;
	}

	const { data, error } = await supabase.auth.getUser();

	if (error) {
		throw new Error(error.message);
	}

	return data?.user;
};


export const logout = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw new Error(error.message);
	}
};

interface updateCurrentUser {
	password?: string;
	fullName?: string;
	avatar?: File | null;
}

interface UpdateUserType {
	password?: string;
	data?: {
		fullName?: string;
	};
}

export const updateCurrentUser = async ({ password, fullName, avatar }: updateCurrentUser) => {
	// 1. Update password OR fullName
	let updateData: UpdateUserType = {};

	if (password) {
		updateData = { password };
	}
	if (fullName) {
		updateData = { data: { fullName } };
	}

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) {
		throw new Error(error.message);
	}
	if (!avatar) {
		return data;
	}

	// 	2. Upload the avatar image
	const fileName = `avatar-${data.user.id}-${Math.random()}`;
	const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);
	if (storageError) {
		throw new Error(storageError.message);
	}

	// 	3. Update avatar in the user
	const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
		}
	});
	if (error2) {
		throw new Error(error2.message);
	}

	return updatedUser;
};
