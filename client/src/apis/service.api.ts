import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Service } from "../types/serviceType";

const API_URL_SERVICES = "http://localhost:8080/services";

// GET
export const getServices = createAsyncThunk("getServices", async () => {
    const res = await axios.get(API_URL_SERVICES);
    return res.data as Service[];
});

// CREATE
export const addService = createAsyncThunk(
    "addService",
    async (newService: Omit<Service, "id">) => {
        const res = await axios.post(API_URL_SERVICES, newService);
        return res.data as Service;
    }
);

// UPDATE
export const updateService = createAsyncThunk(
    "updateService",
    async (updated: Service) => {
        const res = await axios.put(`${API_URL_SERVICES}/${updated.id}`, updated);
        return res.data as Service;
    }
);

// DELETE
export const deleteService = createAsyncThunk(
    "deleteService",
    async (id: string) => {
        await axios.delete(`${API_URL_SERVICES}/${id}`);
        return id;
    }
);
