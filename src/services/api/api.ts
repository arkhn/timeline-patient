import {
  IBundle,
  IBundle_Entry,
  ICondition,
  IEncounter,
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

const transformBundleIntoFhirResource = <ResourceType extends IResourceList>(
  bundle?: Bundle<ResourceType>
): ResourceType[] =>
  (bundle?.entry?.map((entry) => entry.resource) ?? []) as ResourceType[];

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
        transformBundleIntoFhirResource(response),
    }),
    apiEncountersList: build.query<IEncounter[], { patientId?: string }>({
      query: (queryArg) => ({
        url: "/Encounter",
        params: {
          subject: queryArg.patientId,
        },
      }),
      transformResponse: (response: Bundle<IEncounter>) =>
        transformBundleIntoFhirResource(response),
    }),
    apiConditionsList: build.query<ICondition[], { patientId?: string }>({
      query: (queryArg) => ({
        url: "/Condition",
        params: {
          patient: queryArg.patientId,
        },
      }),
      transformResponse: (response: Bundle<ICondition>) =>
        transformBundleIntoFhirResource(response),
    }),
  }),
});

export const {
  useApiPatientsListQuery,
  useApiEncountersListQuery,
  useApiConditionsListQuery,
} = api;
