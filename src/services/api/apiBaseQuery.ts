import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { API_URL } from "../../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

export const apiBaseQuery: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};
