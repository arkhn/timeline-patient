import React from "react";
import { Link } from "react-router-dom";
import { Cell, Column, Table } from "@blueprintjs/table";
import { Icon, H3 } from "@blueprintjs/core";
// import { DATA_TEST } from "constants/dataTest";
import { ROUTE_PATIENT } from "constants/routes";
import "./style.css";
interface Patient {
  firstName: String;
  lastName: String;
  age: number;
  id: String;
}

const PatientTable = () => {
  const [patients, setPatients] = React.useState([] as Patient[]);

  const renderPatientAttribute = (
    attribute: "id" | "firstName" | "lastName" | "age",
    index: number
  ) => (
    <Cell>
      <React.Fragment>
        <Link to={`${ROUTE_PATIENT}/${patients[index].id}`}>
          {patients[index][attribute]}
        </Link>
      </React.Fragment>
    </Cell>
  );
  const calculateAge = (birthday: any) => {
    // birthday is a date
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  React.useEffect(() => {
    // setPatients(DATA_TEST);
    let mkFhir = require("fhir.js");

    let client = mkFhir({
      baseUrl: "http://hapi.fhir.org/baseR4/"
    });

    client
      .search({ type: "Patient", query: { birthdate: "1995" } })
      .then(function(res: any) {
        var bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log("# Patients born in 1974: ", count);
        let pats = res.data.entry.map((x: any) => {
          console.log(x.resource);
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

        setPatients(pats);
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
  }, []);

  return (
    <>
      <H3>
        <Icon icon={"inbox-search"} className="icon-title" /> Résultats
      </H3>
      <div className="table">
        <Table numRows={patients.length}>
          <Column
            key="id"
            name="Identifiant"
            cellRenderer={(index: number) =>
              renderPatientAttribute("id", index)
            }
          />
          <Column
            key="firstName"
            name="Prénom"
            cellRenderer={(index: number) =>
              renderPatientAttribute("firstName", index)
            }
          />
          <Column
            key="lastName"
            name="Nom"
            cellRenderer={(index: number) =>
              renderPatientAttribute("lastName", index)
            }
          />
          <Column
            key="Age"
            name="Age"
            cellRenderer={(index: number) =>
              renderPatientAttribute("age", index)
            }
          />
        </Table>
      </div>
    </>
  );
};

export default PatientTable;
