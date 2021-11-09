import { createApi } from "@reduxjs/toolkit/dist/query";

import { apiBaseQuery } from "./apiBaseQuery";

const tagTypes: string[] = [];

export const api = createApi({
  baseQuery: apiBaseQuery,
  tagTypes,
  endpoints: () => ({}),
});
