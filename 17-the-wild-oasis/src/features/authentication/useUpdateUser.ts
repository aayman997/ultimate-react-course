import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth.ts";

export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess : ({ user }) => {
			toast.success("User successfully updated");
			queryClient.setQueryData(["user"], user);
		},
		onError   : (error: Error) => toast.error(error.message)
	});
	return { updateUser, isUpdating };
};
