import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.ts";
import toast from "react-hot-toast";

export const useCheckout = () => {
	const queryClient = useQueryClient();
	const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
		mutationFn: (bookingId: number) => updateBooking(bookingId, {
			status: "checked-out"
		}),
		onSuccess : async (data) => {
			toast.success(`Booking #${data.id} successfully checked out`);
			await queryClient.invalidateQueries({ queryKey: ["booking"] });
		},
		onError   : () => toast.error(`There was an error while checking out`)
	});
	return { checkout, isCheckingOut };
};
