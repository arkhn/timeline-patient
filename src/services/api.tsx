import { URL_SERVER } from "../constants";
import { Patient } from "types";
import newFhirClient from "fhir.js";

const client = newFhirClient({
  baseUrl: URL_SERVER
});

const makeRequest = async (resource: string, parameters: string) => {
  return new Promise((resolve, reject) => {
    let url = URL_SERVER + resource + "?" + parameters;
    console.log("url : ", url);
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", url);
    xmlhttp.onload = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        let patients = JSON.parse(xmlhttp.response);
        resolve(patients);
      }
    };
    xmlhttp.onerror = function() {
      console.log("error");
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
  console.log("in getcount : ", response);
  return response.total;
};

export const getPatients = async (param?: string) => {
  /*
    getPatients return the lists of patients depending on param.
    If param is empty ill return the whole list.
  */

  /*
    test
  */
  let response: any;
  if (param) {
    //To be adapted !
    response = await makeRequest("Patient", param);
  } else {
    response = await makeRequest("Patient", "_count=30");
  }

  if (!response.entry) return {};
  else
    return response.entry.map(
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
  /*
    getPatientData requests for data from Patient resourcce of id patientId
    return a Patient object.
  */
  const getPatientData = async () => {
    let response: any = await makeRequest("Patient", "_id=" + patientId);

    // let response = await client.search({
    //   type: "Patient",
    //   patient: patientId,
    //   query: {}
    // });
    if (!response.entry) return; //patient not found
    const patientData = response.entry[0];

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
  /*
  Function getSubjectResources returns all resources of type resourceType where attribute subject is a Patient of type patientId
  */
  return client.search({
    type: resourceType,
    query: { subject: { $type: "Patient", $id: patientId } }
  });
};

export const getPatientResources = (
  resourceType: string,
  patientId: string
) => {
  /*
  Function getPatientResources returns all resources of type resourceType where attribute patient has id patientId
  */
  return client.search({
    type: resourceType,
    patient: patientId,
    query: {}
  });
};
