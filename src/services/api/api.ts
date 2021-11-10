import type {
  IBundle,
  IBundle_Entry,
  IPatient,
  IResourceList,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { createApi } from "@reduxjs/toolkit/query/react";

import { apiBaseQuery } from "./apiBaseQuery";

interface BundleEntry<ResourceType extends IResourceList>
  extends IBundle_Entry {
  resource: ResourceType;
}

interface Bundle<ResourceType extends IResourceList> extends IBundle {
  entry?: BundleEntry<ResourceType>[];
}

const tagTypes: string[] = [];

export const api = createApi({
  baseQuery: apiBaseQuery,
  tagTypes,
  endpoints: (build) => ({
    apiPatientsList: build.query<IPatient[], { name?: string; id?: string }>({
      query: (queryArg) => ({
        url: `/Patient`,
        params: {
          _id: queryArg.id,
          name: queryArg.name,
        },
      }),
      transformResponse: (response: Bundle<IPatient>) =>
        response?.entry?.map((entry) => entry.resource) ?? [],
    }),
  }),
});

export const { useApiPatientsListQuery } = api;
