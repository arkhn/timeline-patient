import {
  ICarePlan,
  ICondition,
  IEncounter,
  IPatient,
  IResourceList,
  PatientGenderKind,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import * as faker from "faker";
import { Factory } from "fishery";

import { TERMINOLOGY_SYSTEM_URL } from "../../constants";
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

export const patientFactory = Factory.define<IPatient>(
  ({ sequence, associations }) => ({
    id: sequence.toString(),
    resourceType: "Patient",
    birthDate: faker.date.past().toISOString(),
    identifier: associations.identifier || [
      {
        type: { coding: [{ code: "PI" }] },
        value: faker.datatype.number().toString(),
      },
      {
        type: { coding: [{ code: "INS-NIR" }] },
        value: faker.datatype.number().toString(),
      },
    ],
    name: [{ given: [faker.name.firstName()], family: faker.name.lastName() }],
    gender: faker.name.gender() as PatientGenderKind,
  })
);

export const conditionFactory = Factory.define<ICondition>(
  ({ sequence, associations }) => ({
    id: sequence.toString(),
    resourceType: "Condition",
    code: associations.code || {
      coding: [
        {
          system: faker.internet.url(),
          code: faker.lorem.word(),
          display: faker.lorem.words(4),
        },
      ],
    },
    meta: associations.meta || {
      tag: [{ system: TERMINOLOGY_SYSTEM_URL, display: faker.lorem.word() }],
    },
    onsetDateTime:
      associations.onsetDateTime || faker.date.past().toISOString(),
    subject: associations.subject || {},
  })
);

export const encounterFactory = Factory.define<IEncounter>(
  ({ sequence, associations }) => {
    const periodEnd =
      associations.period?.end || faker.date.past().toISOString();
    const periodStart =
      associations.period?.start ||
      faker.date.past(undefined, periodEnd).toISOString();
    return {
      id: sequence.toString(),
      resourceType: "Encounter",
      location: associations.location || [
        { location: { display: faker.lorem.word() } },
      ],
      meta: associations.meta || {
        tag: [{ system: TERMINOLOGY_SYSTEM_URL, display: faker.lorem.word() }],
      },
      period: {
        ...associations.period,
        start: periodStart,
        end: periodEnd,
      },
      class: associations.subject || {},
    };
  }
);

export const carePlanFactory = Factory.define<ICarePlan>(
  ({ sequence, associations }) => ({
    id: sequence.toString(),
    resourceType: "CarePlan",
    subject: associations.subject || {},
  })
);
