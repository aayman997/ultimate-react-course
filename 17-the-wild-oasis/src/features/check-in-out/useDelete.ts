import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings.ts";
import toast from "react-hot-toast";

export const useDelete = () => {
	const queryClient = useQueryClient();

	const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
		mutationFn: (bookingId: number) => deleteBookingApi(bookingId),
		onSuccess : async () => {
			toast.success(`Booking successfully deleted`);
			await queryClient.invalidateQueries({ queryKey: ["bookings"] });
		},
		onError   : () => toast.error(`There was an error while deleting the booking`)
	});
	return { deleteBooking, isDeleting };
};
