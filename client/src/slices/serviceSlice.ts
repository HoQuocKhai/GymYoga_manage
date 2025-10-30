import { createSlice } from "@reduxjs/toolkit";
import { getServices, addService, updateService, deleteService } from "../apis/service.api";
import type { Service } from "../types/serviceType";

interface ServiceState {
    services: Service[];
    loading: boolean;
    error?: string;
}

const initialState: ServiceState = {
    services: [],
    loading: false,
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getServices.pending, (state) => {
                state.loading = true;
            })
            // GET SERVICE
            .addCase(getServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            // ADD SERVICE
            .addCase(addService.fulfilled, (state, action) => {
                state.services.push(action.payload);
            })
            // UPDATE SERVICE
            .addCase(updateService.fulfilled, (state, action) => {
                const index = state.services.findIndex((s) => s.id === action.payload.id);
                if (index !== -1) state.services[index] = action.payload;
            })
            // DELETE SERVICE
            .addCase(deleteService.fulfilled, (state, action) => {
                state.services = state.services.filter((s) => s.id !== action.payload);
            });
    },
});

export default serviceSlice.reducer;
