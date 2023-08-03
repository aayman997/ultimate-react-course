import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";
import { NewCabin } from "../../../types/NewCabin.ts";

export const useEditCabin = () => {
	const queryClient = useQueryClient();
	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }: { newCabinData: NewCabin; id: number }) => createEditCabin(newCabinData, id),
		onSuccess : async () => {
			toast.success("New cabin Successfully created");
			await queryClient.invalidateQueries({
				queryKey: ["cabins"]
			});
		},
		onError   : (error: Error) => toast.error(error.message)
	});
	return { editCabin, isEditing };
};
