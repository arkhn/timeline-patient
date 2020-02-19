import { URL_SERVER } from "../constants";
import { Patient } from "types";

const mkFhir = require("fhir.js");
const client = mkFhir({
  baseUrl: URL_SERVER
});

function getAge(birthDate: Date) {
  const today = new Date();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  const age = today.getFullYear() - birthDate.getFullYear();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  )
    return age - 1;
  return age;
}

const callApi = (resourceType: string, queryParameters: object) => {
  const patient = client.search({
    type: resourceType,
    query: queryParameters
  });
  return patient;
};

export const getPatients = () => {
  const fetchPatients = async () => {
    const resultData = await callApi("Patient", { _count: 100, _page: 1 });
    // The research bundle (res.data) shoud have a res.data.total attribute to get the total number of results.
    // see https://www.hl7.org/fhir/bundle.html

    const patients = resultData.data.entry.map((patientData: any) => {
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
      return patient;
    });
    return patients;
  };

  return fetchPatients();
};
