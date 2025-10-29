import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import coursesReducer from "../slices/coursesSlice"
import bookingReducer from "../slices/bookingSlice"
import serviceReducer from "../slices/serviceSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        courses: coursesReducer,
        booking: bookingReducer,
        service: serviceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
