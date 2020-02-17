import { URL_SERVER } from "constants/serverConnexion";

const calculateAge = (birthday: any) => {
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
interface Patient {
  firstName: String;
  lastName: String;
  age: number;
  id: String;
}

export const CallApi = (typeR: string, queryR: any) => {
  let mkFhir = require("fhir.js");
  let client = mkFhir({
    baseUrl: URL_SERVER
  });

  let patientPromise = client.search({ type: typeR, query: queryR }); // limited to 20 patients ?
  return patientPromise;
};

export const getPatients = () => {
  let promise = CallApi("Patient", { _count: 100, _page: 1 })
    // The server should have a page option, will allow to show pages on the PatientTable
    // see https://www.hl7.org/fhir/search.html#count
    .then(function(res: any) {
      // The research bundle (res.data) shoud have a res.data.total attribute to get the total number of results.
      // see https://www.hl7.org/fhir/bundle.html
      let pats = res.data.entry.map((x: any) => {
        let patient = {
          id: x.resource.id,
          firstName: undefined,
          lastName: undefined,
          age: NaN
        };
        if (x.resource.name) {
          if (x.resource.name[0].given)
            patient.firstName = x.resource.name[0].given.join(", ");
          if (x.resource.name[0].family)
            patient.lastName = x.resource.name[0].family;
        }
        if (x.resource.birthDate)
          patient.age = calculateAge(new Date(x.resource.birthDate));
        return patient;
      });
      return pats;
    })
    .catch(function(res: any) {
      //Error responses
      if (res.status) {
        console.log("Error", res.status);
      }

      //Errors
      if (res.message) {
        console.log("Error", res.message);
      }
    });
  return promise;
};
