import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DomainType, OrderType } from "../../types/types";
import { getDomains } from "../actions";

export interface DomainsState {
  domains: DomainType[];
  filteredDomains: DomainType[];
  isUsingSort?: boolean;
  loading: boolean;
  error?: string;
}

const initialState: DomainsState = {
  domains: [],
  filteredDomains: [],
  isUsingSort: false,
  loading: true,
  error: undefined,
};

export const domainsSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {
    orderItems(state, action: PayloadAction<OrderType>) {
      const SELECTED_ORDER = action.payload;

      // Sorting Items
      switch (SELECTED_ORDER) {
        case "BY_ACTIVATION": {
          state.isUsingSort = true;
          state.filteredDomains = [...state.domains].sort(
            (a, b) => Number(b.isActive) - Number(a.isActive)
          );
          break;
        }

        case "BY_ASC": {
          state.isUsingSort = true;

          state.filteredDomains = [...state.domains].sort((a, b) => {
            return a.domain.localeCompare(b.domain);
          });

          break;
        }

        case "BY_DESC": {
          state.isUsingSort = true;

          state.filteredDomains = [...state.domains].sort((a, b) => {
            return b.domain.localeCompare(a.domain);
          });

          break;
        }

        case "BY_STATUS": {
          state.isUsingSort = true;

          state.filteredDomains = [...state.domains].sort((a, b) => {
            const statusOrder = {
              verified: 1,
              pending: 2,
              rejected: 3,
              missing: 4,
            };

            if (statusOrder[a.status] < statusOrder[b.status]) return -1;
            if (statusOrder[a.status] > statusOrder[b.status]) return 1;
            return 0;
          });

          break;
        }

        case "DEFAULT_SORT": {
          state.isUsingSort = false;
          break;
        }

        default: {
          state.isUsingSort = false;
        }
      }
    },
  },
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

export const { orderItems } = domainsSlice.actions;
export default domainsSlice.reducer;
