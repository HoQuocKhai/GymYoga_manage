import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../types/userType";
import { createUser, deleteUser, getUserlist, updateUser } from "../apis/user.api";

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
            // POST USER
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                sessionStorage.setItem("user", JSON.stringify(action.payload));
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // GET USERS
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
            })
            // UPDATE USER
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((s) => s.id === action.payload.id);
                if (index !== -1) state.users[index] = action.payload;
            })
            // DELETE USER
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((s) => s.id !== action.payload);
            })
    },
});

export default userSlice.reducer;
