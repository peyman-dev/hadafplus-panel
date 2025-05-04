import { createSlice } from "@reduxjs/toolkit";
import { DomainType } from "../../types/types";
import { getDomains } from "../actions";

interface DomainsState {
  domains: DomainType[];
  loading: boolean;
  error?: string;
}

const initialState: DomainsState = {
  domains: [],
  loading: true,
  error: undefined,
};

export const domainsSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {}, // اگر action خاصی ندارید، خالی بگذارید
  extraReducers: (builder) => {
    builder
      .addCase(getDomains.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getDomains.fulfilled, (state, action) => {
        state.domains = action.payload;
        state.loading = false;
      })
      .addCase(getDomains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default domainsSlice.reducer; // فقط reducer را صادر کنید