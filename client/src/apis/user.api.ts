import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../types/userType";


//create new user
export const createUser = createAsyncThunk(
    "createUser",
    async (newUser: User) => {
        try {
            const res = await axios.post("http://localhost:8080/user", newUser);
            return res.data;
        } catch (error) {
            console.error(error)
        }
    }
);

//get user list
export const getUserlist = createAsyncThunk(
    "getUserList",
    async () => {
        const res = await axios.get("http://localhost:8080/user")
        return res.data
    }
)

//get courses 
export const getCourses = createAsyncThunk(
    "getCourses",
    async () => {
        const res = await axios.get("http://localhost:8080/courses")
        return res.data
    }
)