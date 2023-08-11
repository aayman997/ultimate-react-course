export interface BookingType {
	id: number;
	created_at: string,
	startDate: string
	endDate: string
	numNights: number
	numGuests: number
	status: "unconfirmed" | "checked-in" | "checked-out"
	totalPrice: number
	cabins: {
		name: string
	}
	guests: {
		fullName: string
		email: string
	}
}