import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "app/store";
import type { DomainResourceList } from "models/types";

type ResourceFilterSlice = { filters: DomainResourceList["resourceType"][] };

const initialState: ResourceFilterSlice = {
  filters: [],
};

const resourceFilterSlice = createSlice({
  name: "resourceFilter",
  initialState: initialState,
  reducers: {
    resourceFilterSet: (
      state,
      { payload }: PayloadAction<DomainResourceList["resourceType"]>
    ) => {
      if (state.filters.some((filter) => filter === payload)) {
        state.filters = state.filters.filter((filter) => filter !== payload);
      } else {
        state.filters = [...state.filters, payload];
      }
    },
    resourceFilterListSet: (
      state,
      { payload }: PayloadAction<DomainResourceList["resourceType"][]>
    ) => {
      return { filters: payload };
    },
    resourceFiltersReseted: () => {
      return initialState;
    },
  },
});

export const {
  resourceFilterSet,
  resourceFilterListSet,
  resourceFiltersReseted,
} = resourceFilterSlice.actions;
export const selectResourceFilters = (
  state: RootState
): DomainResourceList["resourceType"][] => state.resourceFilter.filters;

export default resourceFilterSlice.reducer;
