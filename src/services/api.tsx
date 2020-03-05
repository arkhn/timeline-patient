import { URL_SERVER, PATIENT_SHOWN } from "../constants";
import { Patient } from "types";
import newFhirClient from "fhir.js";

const client = newFhirClient({
  baseUrl: URL_SERVER
});

const makeRequest = async (resource: string, parameters: string) => {
  return new Promise((resolve, reject) => {
    let url = URL_SERVER + resource + "?" + parameters;
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", url);
    xmlhttp.onload = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        let patients = JSON.parse(xmlhttp.response);
        resolve(patients);
      }
    };
    xmlhttp.onerror = function() {
      reject({ status: xmlhttp.status, statusText: xmlhttp.statusText });
    };
    xmlhttp.send();
  });
};

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

export const getCount = async (resource: string, queryParameters: string) => {
  // getCount function returns the number of resources of a type";

  const response: any = await makeRequest(resource, queryParameters);
  return response.total;
};

export const getPatients = async (param?: string) => {
  /*
    getPatients return the lists of patients depending on param.
    If param is empty ill return the whole list.
  */

  let response: any;
  if (param) {
    response = await makeRequest("Patient", param);
  } else {
    response = await makeRequest("Patient", "_count=" + PATIENT_SHOWN);
  }

  if (!response.entry) return [];
  else
    return response.entry.map(
      ({ resource: { id, identifier, birthDate, name } }: any) => {
        const patient: Patient = {
          id: id,
          birthDate: birthDate,
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

export const getPatientData = async (patientId: string) => {
  /*
    getPatientData requests for data from Patient resourcce of id patientId
    return a Patient object.
  */
  let response: any = await makeRequest("Patient", "_id=" + patientId);

  if (!response.entry) return; //patient not found
  const patientData = response.entry[0];

  const patient: Patient = {
    id: patientData.resource.id
  };

  // Completing patient information with available data
  if (patientData.resource.identifier) {
    patient.identifier = patientData.resource.identifier
      .map((e: any) => {
        return e.value;
      })
      .join(", ");
  }

  if (patientData.resource.birthDate) {
    patient.age = getAge(new Date(patientData.resource.birthDate));
    patient.birthDate = patientData.resource.birthDate;
  }
  if (patientData.resource.name) {
    if (patientData.resource.name[0].given)
      patient.firstName = patientData.resource.name[0].given.join(", ");
    if (patientData.resource.name[0].family)
      patient.lastName = patientData.resource.name[0].family;
  }

  response = await getPatientResources("AllergyIntolerance", patientId);
  patient.allergyIntolerances = response.data;

  response = await getSubjectResources("Observation", patientId);
  patient.observations = response.data;

  response = await getSubjectResources("Condition", patientId);
  patient.conditions = response.data;

  response = await getPatientResources("EpisodeOfCare", patientId);
  patient.episodesOfCare = response.data;

  return patient;
};

/*
  Function getSubjectResources returns all resources of type resourceType where attribute subject is a Patient of type patientId
  */
export const getSubjectResources = (resourceType: string, patientId: string) =>
  client.search({
    type: resourceType,
    query: { subject: { $type: "Patient", $id: patientId } }
  });
/*
  Function getPatientResources returns all resources of type resourceType where attribute patient has id patientId
  */
export const getPatientResources = (resourceType: string, patientId: string) =>
  client.search({
    type: resourceType,
    patient: patientId
  });
