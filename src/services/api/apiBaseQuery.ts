import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { API_URL, FHIR_API_AUTH_TOKEN } from "../../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    headers.set("Cache-Control", "no-cache");
    FHIR_API_AUTH_TOKEN && headers.set("Authorization", FHIR_API_AUTH_TOKEN);
    return headers;
  },
});

export const apiBaseQuery: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};
