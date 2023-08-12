import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../../types/UserType.ts";

interface ExUserType extends UserType {
	password: string;
	email: string;
}

export const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { isLoading, mutate: login } = useMutation({
		mutationFn: ({ email, password }: ExUserType) => loginApi({ email, password }),
		onSuccess : (user) => {
			queryClient.setQueryData(["user"], user.user);
			navigate("/dashboard", { replace: true });
		},

		onError: (error: Error) => {
			console.log("ERROR", error);
			toast.error(error.message);
		}
	});

	return { isLoading, login };
};
