import type { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";

export const getIdentifiers = (
  patient?: IPatient
): { value?: string; code?: string }[] =>
  patient?.identifier?.map(({ value, type }) => ({
    value,
    code: type?.coding?.[0]?.code?.toUpperCase(),
  })) ?? [];
