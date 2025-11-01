import { useSelector } from "react-redux";
import type { RootState } from "../stores/store";
import type { Booking } from "../types/userType";

export function useValidateBooking() {
    const { booking } = useSelector((state: RootState) => state.booking);

    const isDuplicateBooking = (newBooking: Booking): boolean => {
        return booking.some(
            (b) =>
                b.userId === newBooking.userId &&
                b.courseId === newBooking.courseId &&
                b.bookingDate === newBooking.bookingDate &&
                b.bookingTime === newBooking.bookingTime &&
                b.id !== newBooking.id
        );
    };

    return { isDuplicateBooking };
}
