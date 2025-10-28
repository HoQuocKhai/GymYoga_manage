import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import coursesReducer from "../slices/coursesSlice"
import bookingReducer from "../slices/bookingSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        courses: coursesReducer,
        booking: bookingReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
