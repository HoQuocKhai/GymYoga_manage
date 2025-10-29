import { createSlice } from "@reduxjs/toolkit";
import type { BookingState } from "../types/userType";
import { addBooking, deleteBooking, getBooking, updateBooking } from "../apis/booking.api";

const initialState: BookingState = {
    booking: [],
    loading: false,
    error: null,
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch danh sách lịch đã đặt
            .addCase(getBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.booking = action.payload;
            })
            .addCase(getBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // --- ADD BOOKING ---
            .addCase(addBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.booking.push(action.payload);
            })
            // --- UPDATE ---
            .addCase(updateBooking.fulfilled, (state, action) => {
                const index = state.booking.findIndex(
                    (b) => b.id === action.payload.id
                );
                if (index !== -1) {
                    state.booking[index] = action.payload;
                }
            })
            // --- DELETE ---
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.booking = state.booking.filter((book) => book.id != action.payload)
            })
    },
});

export default bookingSlice.reducer;
