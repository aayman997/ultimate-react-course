import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";

interface NewCabinData {
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	description: string;
	image: File;
}

export const useEditCabin = () => {
	const queryClient = useQueryClient();
	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }: { newCabinData: NewCabinData; id: number }) => createEditCabin(newCabinData, id),
		onSuccess : () => {
			toast.success("New cabin Successfully created");
			queryClient.invalidateQueries({
				queryKey: ["cabins"]
			});
		},
		onError   : (error: Error) => toast.error(error.message)
	});
	return { editCabin, isEditing };
};
