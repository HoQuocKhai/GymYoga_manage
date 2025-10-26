import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../types/userType";
import { createUser, getUserlist } from "../apis/user.api";

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem("user", JSON.stringify(action.payload));
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getUserlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserlist.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUserlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    },
});

export default userSlice.reducer;
