import type { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "app/store";

type ResourceFilterSlice = { filters: IResourceList["resourceType"][] };

const initialState: ResourceFilterSlice = {
  filters: [],
};

const resourceFilterSlice = createSlice({
  name: "resourceFilter",
  initialState: initialState,
  reducers: {
    resourceFilterSet: (
      state,
      { payload }: PayloadAction<IResourceList["resourceType"]>
    ) => {
      if (state.filters.some((filter) => filter === payload)) {
        state.filters = state.filters.filter((filter) => filter !== payload);
      } else {
        state.filters = [...state.filters, payload];
      }
    },
    resourceFilterListSet: (
      state,
      { payload }: PayloadAction<IResourceList["resourceType"][]>
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
): IResourceList["resourceType"][] => state.resourceFilter.filters;

export default resourceFilterSlice.reducer;
