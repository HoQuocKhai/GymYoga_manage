import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Booking } from "../types/userType";


//get courses 
export const getBooking = createAsyncThunk(
    "getBooking",
    async () => {
        const res = await axios.get("http://localhost:8080/bookings")
        return res.data
    }
)

// POST thêm booking mới
export const addBooking = createAsyncThunk(
    "addBooking",
    async (newBooking: Booking) => {
        try {
            const res = await axios.post("http://localhost:8080/bookings", newBooking);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

// PUT update booking
export const updateBooking = createAsyncThunk(
    "updateBooking",
    async (updatedBooking: Booking) => {
        try {
            const res = await axios.put(
                `http://localhost:8080/bookings/${updatedBooking.id}`,
                updatedBooking
            );
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

//  delete booking
export const deleteBooking = createAsyncThunk(
    "deleteBooking",
    async (deleteBooking: Booking) => {
        try {
            const res = await axios.delete(
                `http://localhost:8080/bookings/${deleteBooking.id}`
            );
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);
