import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";

interface NewCabinData {
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	description: string;
	image: string;
}


export const useCreateCabin = () => {
	const queryClient = useQueryClient();
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: ({ newCabinData }: { newCabinData: NewCabinData; }) => createEditCabin(newCabinData),
		onSuccess : async () => {
			toast.success("New cabin Successfully created");
			await queryClient.invalidateQueries({
				queryKey: ["cabins"]
			});
		},
		onError   : (error: Error) => toast.error(error.message)
	});

	return { createCabin, isCreating };
};
