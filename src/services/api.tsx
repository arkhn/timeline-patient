import { URL_SERVER, PATIENT_REQUESTED } from "../constants";
import { Patient, Bundle, PatientBundle } from "types";

const makeRequest = async (
  resource: string,
  total?: boolean,
  parameters?: string,
  count = PATIENT_REQUESTED
) => {
  /*
   * Function makeRequest
   * resource: the resource name we want to fetch
   * parameters (optional)
   * count: number of maximum resource we want to fetch
   */
  const url: string = `${URL_SERVER}${resource}?${parameters || ""}`;

  let response = await makeRequestByURL(url, total, count);
  return response;
};

const makeRequestByURL = async (
  url: string,
  total?: boolean,
  count = PATIENT_REQUESTED
) => {
  /*
   * function makeRequestByURL
   * url: the url of the data we want to fetch
   * total: boolean, the bundle must contain the total number of items corresponding to the item search ?
   * count: number of maximum resource we want to fetch
   */
  let response = await new Promise<any>((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `${url}&_count=${count}`);
    xmlhttp.onload = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        let resources = JSON.parse(xmlhttp.response);
        resolve(resources);
      }
    };
    xmlhttp.onerror = function() {
      reject({ status: xmlhttp.status, statusText: xmlhttp.statusText });
    };
    xmlhttp.send();
  });

  let bundleResult: Bundle = {
    entry: response.entry || []
  };

  if (response.link) {
    response.link.map((x: any) => {
      if (x.relation === "next") {
        bundleResult.nextLink = x.url;
        return false;
      }
      return false;
    });
  }

  /*
    if total : get the total number of matches
  */
  if (total)
    if (response.data && response.data.total) {
      //update with bundle total if available
      bundleResult.total = response.data.total;
    } else {
      // Get count
      let numberResponse = await new Promise<any>((resolve, reject) => {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", `${url}&_summary=count`);
        xmlhttp.onload = () => {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resources = JSON.parse(xmlhttp.response);
            resolve(resources);
          }
        };
        xmlhttp.onerror = function() {
          reject({ status: xmlhttp.status, statusText: xmlhttp.statusText });
        };
        xmlhttp.send();
      });
      bundleResult.total = numberResponse.total;
    }

  return bundleResult;
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

export const getPatients = async (
  param?: string,
  count = PATIENT_REQUESTED
) => {
  /*
   * getPatients return the lists of patients depending on param.
   * param (optional): if empty, will return the whole list.
   */

  let response: PatientBundle = (await makeRequest(
    "Patient",
    false,
    param,
    count
  )) as PatientBundle;

  return addPatientsToBundle(response);
};

export const getPatientsPerQuery = async (
  searchNameParams: any,
  searchParams: any
) => {
  /*
   * Function getPatientsPerQuery used to get PatientBundle according to query parameters
   * searchNameParams: object containing name parameters search
   * searchParams: object[] containing list of other parameters
   * TODO : for now, this function is limited by the server response to 500 resources. Must find a way to improve it (searching computation done by the server ideally ?)
   */
  let bundles: Bundle[] = [];
  let params: string;

  if (searchNameParams.text) {
    params = "";

    searchNameParams.text.split(" ").map((x: string) => {
      params += "&name=" + x;
      return params;
    });
    let bundlePatient = await makeRequest("Patient", false, params, 10000);

    let entries = bundlePatient.entry;
    params = "";
    searchNameParams.text.split(" ").map((x: string) => {
      params += "&identifier=" + x;
      return params;
    });

    bundlePatient = await makeRequest("Patient", false, params, 10000);

    bundlePatient.entry = bundlePatient.entry.concat(entries);

    bundles.push(bundlePatient);
  }

  bundles = bundles.concat(
    await Promise.all(
      searchParams.map((x: any) => {
        switch (x.label) {
          case "Age":
            params = "";
            const correspondingDate: Date = new Date();
            correspondingDate.setFullYear(
              correspondingDate.getFullYear() - parseInt(x.text)
            );
            const yyyy = correspondingDate.getFullYear();
            const mm =
              (correspondingDate.getMonth() + 1 > 9 ? "" : "0") +
              (correspondingDate.getMonth() + 1);
            const dd =
              (correspondingDate.getDate() > 9 ? "" : "0") +
              correspondingDate.getDate();

            switch (x.symbol) {
              case "=":
                params += `&birthdate=lt${yyyy}-${mm}-${dd}`;
                params += `&birthdate=gt${yyyy - 1}-${mm}-${dd}`;
                return getPatients(params, 1000);
              case ">":
                params += `&birthdate=lt${yyyy}-${mm}-${dd}`;
                return getPatients(params, 1000);
              case "<":
                params += `&birthdate=gt${yyyy}-${mm}-${dd}`;
                return getPatients(params, 1000);
            }
            return {};
          case "Diabète":
            return getPatientPerCondition("73211009");
          default:
            console.info(`Paramètre ${x.label} non reconnu`);
        }
        return [];
      })
    )
  );

  let finalBundle: Bundle = bundles[0];
  bundles.map((bundle: Bundle) => {
    if (finalBundle !== bundle && bundle.entry.length > 0) {
      let listId = bundle.entry.map((x: any) => x.resource.id);
      finalBundle.entry = finalBundle.entry.filter(
        (entry: any) => listId.indexOf(entry.resource.id) >= 0
      );
    }
    return false;
  });
  finalBundle.total = finalBundle.entry.length;

  return addPatientsToBundle(finalBundle);
};

export const requestNextPatients = async (bundle: PatientBundle) => {
  /*
   * function requestNextPatients
   * Return the same bundle with more patients, fetched from the nextLink attribute.
   */
  if (!bundle.nextLink) {
    console.info("no link available");
    return;
  } else {
    let newBundle: PatientBundle = (await makeRequestByURL(
      bundle.nextLink
    )) as PatientBundle;

    bundle.entry = bundle.entry.concat(newBundle.entry);

    newBundle = addPatientsToBundle(newBundle);
    bundle.patients = bundle.patients.concat(newBundle.patients);
    bundle.nextLink = newBundle.nextLink;
    return bundle;
  }
};

export const addPatientsToBundle = (bundle: Bundle) => {
  /*
   *  addPatientsToBundle transforms a bundle in a PatientBundle (generate Patient objects)
   */

  let response: PatientBundle = bundle as PatientBundle;
  response.patients = response.entry.map((entry: any) => {
    const patient: Patient = {
      id: entry.resource.id,
      birthDate: entry.resource.birthDate,
      age:
        entry.resource.birthDate && getAge(new Date(entry.resource.birthDate))
    };
    if (entry.resource.name) {
      if (entry.resource.name[0].given)
        patient.firstName = entry.resource.name[0].given.join(", ");
      if (entry.resource.name[0].family)
        patient.lastName = entry.resource.name[0].family;
    }
    if (entry.resource.identifier) {
      patient.identifier = entry.resource.identifier
        .map((e: any) => {
          return e.value;
        })
        .join(", ");
    }
    return patient;
  });

  return response;
};

export const getPatientData = async (patientId: string, detailed?: boolean) => {
  /*
   * getPatientData requests for data from Patient resource of id patientId. Used to load all data to show all patient hospitalizations.
   * patientId
   * detailed: get detailed informations about patient or not ? (slower, more API calls)
   * return a Patient object.
   */
  let response: any = await makeRequest("Patient", false, "_id=" + patientId);

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

  if (detailed) {
    response = await getPatientResources("AllergyIntolerance", patientId);
    patient.allergyIntolerances = response.entry;

    response = await getSubjectResources("Observation", patientId);
    patient.observations = response.entry;

    response = await getSubjectResources("Condition", patientId);
    patient.conditions = response.entry;

    response = await getPatientResources("EpisodeOfCare", patientId);
    patient.episodesOfCare = response.entry;
  }

  return patient;
};

/*
  Return the list of patients affected by a condition
  Example : 73211009 = diabetes
*/
export const getPatientPerCondition = async (conditionId: string) => {
  /*
    get all conditions
    http://hapi.fhir.org/baseR4/Condition?code=73211009
  */
  let response: any = await makeRequest(
    "Condition",
    true,
    `&code=${conditionId}`
  );
  if (!response) return;

  const refsList = response.map((x: any) => {
    return x.resource.subject.reference.replace("Patient/", "");
  });

  return await Promise.all(
    refsList.map((x: string) => getPatientData(x, false))
  );
};

/*
  Function getSubjectResources returns all resources of type resourceType where attribute subject is a Patient of type patientId
  */
export const getSubjectResources = async (
  resourceType: "Observation" | "Condition",
  patientId: string
) => {
  return await makeRequest(
    resourceType,
    true,
    `&subject:Patient._id=${patientId}`
  );
};
/*
  Function getPatientResources returns all resources of type resourceType where attribute patient has id patientId
  */
export const getPatientResources = async (
  resourceType: "AllergyIntolerance" | "EpisodeOfCare",
  patientId: string
) => {
  return await makeRequest(resourceType, true, `patient=${patientId}`);
};

