import React from "react";
import { Link } from "react-router-dom";
import { Cell, Column, Table } from "@blueprintjs/table";
import { Icon, H3 } from "@blueprintjs/core";
import { ROUTE_PATIENT } from "../../../constants";
import { Patient } from "types";

import "./style.css";

interface Props {
  patients: Patient[];
  patientCount: string;
}

const PatientTable = ({ patients, patientCount }: Props) => {
  const renderPatientAttribute = (
    attribute: "id" | "identifier" | "firstName" | "lastName" | "age",
    index: number
  ) => (
    <Cell>
      <React.Fragment>
        <Link to={`${ROUTE_PATIENT}/${patients[index].id}`}>
          {patients[index][attribute] !== undefined
            ? patients[index][attribute]
            : "Inconnu"}
          {/* Have to do !== undefined because if patients[index][attribute] (ex: patient age = 0), it will display "Inconnu" */}
        </Link>
      </React.Fragment>
    </Cell>
  );

  return (
    <>
      <H3>
        <Icon icon={"inbox-search"} className="icon-title" /> Résultats
      </H3>
      <div className="table">
        <Table
          enableColumnReordering={true}
          enableColumnResizing={true}
          numRows={patients.length}
        >
          <Column
            key="id"
            name="id"
            cellRenderer={(index: number) =>
              renderPatientAttribute("id", index)
            }
          />
          <Column
            key="identifier"
            name="Identifiant"
            cellRenderer={(index: number) =>
              renderPatientAttribute("identifier", index)
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
      <div className="infoPatient">
        {patientCount !== undefined &&
          `${patientCount} patient-e-s identifié-e-s`}
      </div>
    </>
  );
};

export default PatientTable;
