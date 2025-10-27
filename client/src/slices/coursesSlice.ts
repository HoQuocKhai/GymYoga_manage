import { createSlice } from "@reduxjs/toolkit";
import type { CoursesState } from "../types/userType";
import { getCourses } from "../apis/user.api";

const initialState: CoursesState = {
    courses: [],
    loading: false,
    error: null,
};

const coursesSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch danh sách các khoá học
            .addCase(getCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    },
});

export default coursesSlice.reducer;
