import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth.ts";
import { UserType } from "../../../types/UserType.ts";
import { User } from "@supabase/supabase-js";

export const useUser = () => {
	const { isLoading, data: user } = useQuery<UserType | null>({
		queryKey: ["user"],
		queryFn : getCurrentUser,
		retry   : false
	});

	return { isLoading, user: user as User, isAuthenticated: user?.role === "authenticated" };
};
