import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../types/userType";

const API_URL_USERS = "http://localhost:8080/users";

// GET
export const getUserlist = createAsyncThunk(
    "getUserList",
    async () => {
        const res = await axios.get(`${API_URL_USERS}`)
        return res.data
    }
)

// CREATE
export const createUser = createAsyncThunk(
    "createUser",
    async (newUser: User) => {
        try {
            const res = await axios.post(`${API_URL_USERS}`, newUser);
            return res.data;
        } catch (error) {
            console.error(error)
        }
    }
);

// UPDATE
export const updateUser = createAsyncThunk(
    "updateUser",
    async (updated: User) => {
        const res = await axios.put(`${API_URL_USERS}/${updated.id}`, updated);
        return res.data
    }
);

// DELETE
export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id: string) => {
        await axios.delete(`${API_URL_USERS}/${id}`);
        return id;
    }
);

// GET COURSES
export const getCourses = createAsyncThunk(
    "getCourses",
    async () => {
        const res = await axios.get("http://localhost:8080/courses")
        return res.data
    }
)