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

export const getPatients = async () => {
  const response = await client.search({
    type: "Patient",
    query: { _count: 100, _page: 1 }
  });

  // The research bundle (res.data) shoud have a res.data.total attribute to get the total number of results.
  // see https://www.hl7.org/fhir/bundle.html

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
