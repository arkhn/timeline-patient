import React from "react";
import { Link } from "react-router-dom";

import { Cell, Column, Table } from "@blueprintjs/table";
import Header from "components/header";
import { DATA_TEST } from "constants/dataTest";

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
        <Link to={`${ROUTE_PATIENT}/${patients[index].id}`}>
          {patients[index][attribute]}
        </Link>
      </React.Fragment>
    </Cell>
  );

  // TODO: charge dynamically patient information
  React.useEffect(() => {
    setPatients(DATA_TEST);
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
