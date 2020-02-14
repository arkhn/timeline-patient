import React from "react";

const calculateAge = (birthday: any) => {
  // birthday is a date
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

export const CallApi = () => {
  let mkFhir = require("fhir.js");
  let client = mkFhir({
    baseUrl: "http://hapi.fhir.org/baseR4/"
  });

  let patientPromise = client
    .search({ type: "Patient", query: { birthdate: "1995" } })
    .then(function(res: any) {
      let pats = res.data.entry.map((x: any) => {
        let patient = {
          age: 0,
          id: x.resource.id,
          firstName: undefined,
          lastName: undefined
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
  return patientPromise;
};
