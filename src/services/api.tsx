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

const callApi = (
  resourceType: string,
  queryParameters: object,
  patientId?: string
) => {
  let searchObject = {};
  if (patientId) {
    searchObject = {
      type: resourceType,
      patient: patientId,
      query: queryParameters
    };
  } else {
    searchObject = {
      type: resourceType,
      query: queryParameters
    };
  }
  const patient = client.search(searchObject);
  return patient;
};

const getCount = async (resource: string, queryParameters: object) => {
  // getCount function returns the number of resources of a type";
  // _summary: "count"  must be added to queryParameters
  const fetchCount = async () => {
    const resultData = await callApi(resource, queryParameters);
    return resultData.data.total;
  };

  return fetchCount();
};

export const getPatients = async () => {
  const response = await client.search({
    type: "Patient",
    query: { _count: 100, _page: 1 }
  });

  return response.data.entry.map(
    ({ resource: { id, birthDate, name } }: any) => {
      const patient: Patient = {
        id: id,
        age: birthDate && getAge(new Date(birthDate))
      };
      if (name) {
        if (name[0].given) patient.firstName = name[0].given.join(", ");
        if (name[0].family) patient.lastName = name[0].family;
      }
      return patient;
    }
  );
};

export const getPatientData = (patientId: string) => {
  const getPatientData = async () => {
    var count = await getCount("Patient", { _summary: "count" });
    console.log("count : ", count);

    const resultData = await callApi("Patient", {}, patientId);
    // The research bundle (res.data) shoud have a res.data.total attribute to get the total number of results.
    // see https://www.hl7.org/fhir/bundle.html

    console.log(resultData);
    const patientData = resultData.data.entry[0];

    const patient: Patient = {
      id: patientData.resource.id,
      firstName: undefined,
      lastName: undefined,
      age: patientData.resource.birthDate
        ? getAge(new Date(patientData.resource.birthDate))
        : NaN
    };
    if (patientData.resource.name) {
      if (patientData.resource.name[0].given)
        patient.firstName = patientData.resource.name[0].given.join(", ");
      if (patientData.resource.name[0].family)
        patient.lastName = patientData.resource.name[0].family;
    }
    console.log("observations : ", resultData);
    return patient;
  };

  return getPatientData();
};
