import type {
  IBinary,
  IBundle,
  IParameters,
  IResourceList,
} from "@ahryman40k/ts-fhir-types/lib/R4";

export type DomainResourceList = Exclude<
  IResourceList,
  IBundle | IBinary | IParameters
>;
