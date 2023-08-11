import { useMutation } from "@tanstack/react-query";
import { singUp as singUpApi } from "../../services/apiAuth.ts";
import toast from "react-hot-toast";

export const useSignup = () => {
	const { mutate: singUp, isLoading } = useMutation({
		mutationFn: singUpApi,

		onSuccess: (data) => {
			toast.success(`${data?.user?.user_metadata.fullName} account successfully created! Please verify the new account from the user's email address ${data?.user?.email}`);
		}
	});
	return { singUp, isLoading };
};
