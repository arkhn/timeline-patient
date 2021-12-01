import type { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";

export const getIPP = (patient?: IPatient): string | undefined =>
  patient?.identifier?.find(({ type }) =>
    type?.coding?.some(({ code }) => code === "PI")
  )?.value;

export const getINS = (patient?: IPatient): string | undefined =>
  patient?.identifier?.find(({ type }) =>
    type?.coding?.some(({ code }) => code === "INS-NIR")
  )?.value;
