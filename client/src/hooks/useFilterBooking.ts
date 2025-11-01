import type { Booking, User } from "../types/userType";

export default function useFilterBooking(bookings: Booking[] | null) {
    const raw = sessionStorage.getItem("user");
    if (!raw) return [];

    const user: User = JSON.parse(raw);

    const BookingList = bookings?.filter(
        (booking) => String(booking.userId) === String(user.id)
    ) ?? [];

    return BookingList;
}
