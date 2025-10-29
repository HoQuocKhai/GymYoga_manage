import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Service } from "../types/serviceType";

const API_URL = "http://localhost:8080/services"; // json-server

// GET all
export const getServices = createAsyncThunk("services/getAll", async () => {
    const res = await axios.get(API_URL);
    return res.data as Service[];
});

// ADD
export const addService = createAsyncThunk(
    "services/add",
    async (newService: Omit<Service, "id">) => {
        const res = await axios.post(API_URL, newService);
        return res.data as Service;
    }
);

// UPDATE
export const updateService = createAsyncThunk(
    "services/update",
    async (updated: Service) => {
        const res = await axios.put(`${API_URL}/${updated.id}`, updated);
        return res.data as Service;
    }
);

// DELETE
export const deleteService = createAsyncThunk(
    "services/delete",
    async (id: string) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);
