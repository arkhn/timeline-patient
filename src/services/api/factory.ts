import {
  IPatient,
  IResourceList,
  PatientGenderKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import * as faker from "faker";
import { Factory } from "fishery";

import { Bundle } from "./api";

export const bundleFactory = <ResourceType extends IResourceList>(): Factory<
  Bundle<ResourceType>,
  { resources: ResourceType[] }
> =>
  Factory.define<Bundle<ResourceType>, { resources: ResourceType[] }>(
    ({ transientParams }) => ({
      resourceType: "Bundle",
      entry: transientParams.resources?.map((resource) => ({ resource })) ?? [],
    })
  );

export const patientFactory = Factory.define<IPatient>(({ sequence }) => ({
  id: sequence.toString(),
  resourceType: "Patient",
  birthDate: faker.date.past().toString(),
  name: [{ given: [faker.name.firstName()], family: faker.name.lastName() }],
  gender: faker.name.gender() as PatientGenderKind,
}));
