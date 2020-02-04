import React from "react";
import { Link } from "react-router-dom";
import { Cell, Column, Table } from "@blueprintjs/table";
import { Icon, H3, Button } from "@blueprintjs/core";
import { DATA_TEST } from "constants/dataTest";
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
    attribute: "firstName" | "lastName" | "age",
    index: number
  ) => (
    <Cell>
      <Link to={`/patient/${patients[index].id}`}>
        {patients[index][attribute]}
      </Link>
    </Cell>
  );

  React.useEffect(() => {
    setPatients([
      { firstName: "toto1", lastName: "toto2", age: 5, id: "1" },
      { firstName: "tata1", lastName: "tata2", age: 10, id: "2" }
    ]);
  }, []);

  return (
    <>
      <H3>
        <Icon icon={"numbered-list"} /> Résultats
      </H3>
      <div className="table">
        <Table numRows={patients.length}>
          <Column
            key="firstName"
            name="Nom"
            cellRenderer={(index: number) =>
              renderPatientAttribute("firstName", index)
            }
          />
          <Column
            key="lastName"
            name="Prénom"
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
