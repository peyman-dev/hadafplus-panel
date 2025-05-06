import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DomainType, SortsType } from "../../types/types";
import { getDomains, removeDomain } from "../actions";

export interface DomainsState {
  domains: DomainType[];
  filteredDomains: DomainType[];
  isUsingFilters?: boolean;
  loading: boolean;
  error?: string;
}

const initialState: DomainsState = {
  domains: [],
  filteredDomains: [],
  isUsingFilters: false,
  loading: true,
  error: undefined,
};

export const domainsSlice = createSlice({
  name: "domains",
  initialState,
  reducers: {
    // This function will filter the domains by status !
    sortItems(state, action: PayloadAction<SortsType>) {
      const SELECTED_ORDER = action.payload;

      // Sorting Items
      switch (SELECTED_ORDER) {
        case "BY_ACTIVATION": {
          state.isUsingFilters = true;
          state.filteredDomains = [...state.domains].sort(
            (a, b) => Number(b.isActive) - Number(a.isActive)
          );
          break;
        }

        case "BY_ASC": {
          state.isUsingFilters = true;

          state.filteredDomains = [...state.domains].sort((a, b) => {
            return a.domain.localeCompare(b.domain);
          });

          break;
        }

        case "BY_DESC": {
          state.isUsingFilters = true;

          state.filteredDomains = [...state.domains].sort((a, b) => {
            return b.domain.localeCompare(a.domain);
          });

          break;
        }

        case "BY_STATUS": {
          state.isUsingFilters = true;

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
          state.isUsingFilters = false;
          state.filteredDomains = [...state.domains];
          break;
        }

        default: {
          state.isUsingFilters = false;
          state.filteredDomains = [...state.domains];
        }
      }
    },

    // This function will filter the domains by Query
    search: (state, action: PayloadAction<String>) => {
      const keyword = String(action.payload);
      if (keyword.length) {
        state.isUsingFilters = true;
        let filteredList = [...state.domains].filter((domain) =>
          domain.domain.includes(keyword)
        );
        state.filteredDomains = filteredList;
      } else {
        state.isUsingFilters = false;
        state.filteredDomains = state.domains;
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

export const { sortItems, search } = domainsSlice.actions;
export default domainsSlice.reducer;
