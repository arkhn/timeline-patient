import { URL_SERVER } from "../constants";
import { Patient } from "types";
import newFhirClient from "fhir.js";

const client = newFhirClient({
  baseUrl: URL_SERVER
});

const getAge = (birthDate: Date) => {
  const today = new Date();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  const age = today.getFullYear() - birthDate.getFullYear();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  )
    return age - 1;
  return age;
};

export const getCount = async (resource: string, queryParameters: object) => {
  // getCount function returns the number of resources of a type";
  // _summary: "count"  must be added to queryParameters

  const response = await client.search({
    type: resource,
    query: queryParameters
  });

  return response.data.total;
};

export const getPatients = async () => {
  const response = await client.search({
    type: "Patient",
    query: { _count: 30, _page: 1 }
  });

  return response.data.entry.map(
    ({ resource: { id, identifier, birthDate, name } }: any) => {
      const patient: Patient = {
        id: id,
        age: birthDate && getAge(new Date(birthDate))
      };
      if (name) {
        if (name[0].given) patient.firstName = name[0].given.join(", ");
        if (name[0].family) patient.lastName = name[0].family;
      }
      if (identifier) {
        patient.identifier = identifier
          .map((e: any) => {
            return e.value;
          })
          .join(", ");
      }

      return patient;
    }
  );
};

export const getPatientData = (patientId: string) => {
  const getPatientData = async () => {
    // var count = await getCount("Patient", { _summary: "count" });
    // console.log("count : ", count);

    let response = await client.search({
      type: "Patient",
      patient: patientId,
      query: {}
    });
    // The research bundle (res.data) shoud have a res.data.total attribute to get the total number of results.
    // see https://www.hl7.org/fhir/bundle.html
    const patientData = response.data.entry[0];

    const patient: Patient = {
      id: patientData.resource.id
    };

    // Completing patient information with available data
    if (patientData.resource.identifier) {
      patient.identifier = patientData.resource.identifier[0];
    }

    if (patientData.resource.birthDate) {
      patient.age = getAge(new Date(patientData.resource.birthDate));
      patient.birthDate =
        patientData.resource.birthDate +
        " (" +
        patient.age.toString() +
        " ans)";
    }
    if (patientData.resource.name) {
      if (patientData.resource.name[0].given)
        patient.firstName = patientData.resource.name[0].given.join(", ");
      if (patientData.resource.name[0].family)
        patient.lastName = patientData.resource.name[0].family;
    }

    if (patientData.resource.identifier) {
      patient.identifier = patientData.resource.identifier
        .map((e: any) => {
          return e.value;
        })
        .join(", ");
    }

    const responseAI = await getPatientResources(
      "AllergyIntolerance",
      patientId
    );
    const responseO = await getSubjectResources("Observation", patientId);
    const responseC = await getSubjectResources("Condition", patientId);
    const responseEoC = await getPatientResources("EpisodeOfCare", patientId);

    patient.number = {
      AllergyIntolerance: responseAI.data.total,
      Observation: responseO.data.total,
      Condition: responseC.data.total,
      EpisodeOfCare: responseEoC.data.total
    };

    return patient;
  };

  return getPatientData();
};

export const getSubjectResources = (
  resourceType: string,
  patientId: string
) => {
  return client.search({
    type: resourceType,
    query: { subject: { $type: "Patient", $id: patientId } }
  });
};

export const getPatientResources = (
  resourceType: string,
  patientId: string
) => {
  return client.search({
    type: resourceType,
    patient: patientId,
    query: {}
  });
};
