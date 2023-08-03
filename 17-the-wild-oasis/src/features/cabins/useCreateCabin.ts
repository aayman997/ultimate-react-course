import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";


export const useCreateCabin = () => {
	const queryClient = useQueryClient();
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: createEditCabin,

		onSuccess: async () => {
			toast.success("New cabin Successfully created");
			await queryClient.invalidateQueries({
				queryKey: ["cabins"]
			});
		},
		onError  : (error: Error) => toast.error(error.message)
	});

	return { createCabin, isCreating };
};
