import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../types/userType";


//create new user

export const createUser = createAsyncThunk(
    "user/createUser",
    async (newUser: User) => {
        try {
            const res = await axios.post("http://localhost:8080/user", newUser);
            return res.data;
        } catch (error) {
            console.error(error)
        }
    }
);