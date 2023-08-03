import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess : () => {
			toast.success("Cabin Successfully deleted");

			queryClient.invalidateQueries({
				queryKey: ["cabins"]
			});
		},
		onError   : (err: Error) => toast.error(err.message)
	});

	return { isDeleting, deleteCabin };
};
