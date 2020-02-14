import React from "react";
import { Link } from "react-router-dom";
import { Cell, Column, Table } from "@blueprintjs/table";
import { Icon, H3 } from "@blueprintjs/core";
import { ROUTE_PATIENT } from "constants/routes";

import { CallApi } from "services/ApiCalls";

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

  React.useEffect(() => {
    let patientPromise = CallApi();
    patientPromise.then((value: any) => {
      setPatients(value);
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
