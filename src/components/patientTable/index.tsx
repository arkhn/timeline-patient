import React from "react";
import { Link } from "react-router-dom";

import { Cell, Column, Table } from "@blueprintjs/table";
import Header from "components/header";

import { ROUTE_PATIENT } from "constants/routes";
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
      <React.Fragment>
        {/* React fragment used to avoid blueprintjs issue #2446 */}
        <Link to={ROUTE_PATIENT + `${patients[index].id}`}>
          {patients[index][attribute]}
        </Link>
      </React.Fragment>
    </Cell>
  );

  // TODO: charge dynamically patient information
  React.useEffect(() => {
    setPatients([
      { firstName: "Prenom1", lastName: "Nom1", age: 5, id: "1" },
      { firstName: "Prenom2", lastName: "Nom2", age: 10, id: "2" },
      { firstName: "Prenom3", lastName: "Nom3", age: 10, id: "3" },
      { firstName: "Prenom4", lastName: "Nom4", age: 10, id: "4" },
      { firstName: "Jean", lastName: "Dupont", age: 10, id: "5" },
      { firstName: "Prenom6", lastName: "Nom6", age: 10, id: "6" }
    ]);
  }, []);

  return (
    <>
      <Header />
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
          cellRenderer={(index: number) => renderPatientAttribute("age", index)}
        />
      </Table>
    </>
  );
};

export default PatientTable;
