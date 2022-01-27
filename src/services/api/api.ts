import {
  IBundle,
  IBundle_Entry,
  ICondition,
  IEncounter,
  IPatient,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { createApi } from "@reduxjs/toolkit/query/react";

import type { DomainResourceList } from "models/types";

import { apiBaseQuery } from "./apiBaseQuery";

interface BundleEntry<ResourceType extends DomainResourceList>
  extends IBundle_Entry {
  resource: ResourceType;
}

export interface Bundle<ResourceType extends DomainResourceList>
  extends IBundle {
  entry?: BundleEntry<ResourceType>[];
}

const tagTypes: string[] = [];

const transformBundleIntoFhirResource = <
  ResourceType extends DomainResourceList
>(
  bundle?: Bundle<ResourceType>
): ResourceType[] =>
  (bundle?.entry?.map((entry) => entry.resource) ?? []) as ResourceType[];

export const api = createApi({
  baseQuery: apiBaseQuery,
  tagTypes,
  endpoints: (build) => ({
    // Patients
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
    // Encounters
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
    // Conditions
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
    // Check https://www.hl7.org/fhir/operation-patient-everything.html to know more about this request
    apiPatientEverythingList: build.query<
      DomainResourceList[],
      { patientId: string }
    >({
      query: (queryArg) => ({
        url: `/Patient/${queryArg.patientId}/$everything`,
      }),
      transformResponse: (response: Bundle<DomainResourceList>) =>
        transformBundleIntoFhirResource(response),
    }),
  }),
});

export const {
  useApiPatientsListQuery,
  useApiEncountersListQuery,
  useApiConditionsListQuery,
  useApiPatientEverythingListQuery,
} = api;
