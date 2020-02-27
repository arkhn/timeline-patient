import React from "react";
import { Link } from "react-router-dom";
import { Cell, Column, Table } from "@blueprintjs/table";
import { Icon, H3 } from "@blueprintjs/core";
import { ROUTE_PATIENT } from "../../../constants";
import { getPatients, getCount } from "services/api";
import { Patient } from "types";

import "./style.css";

const PatientTable = () => {
  const [patients, setPatients] = React.useState([] as Patient[]);
  const [patientCount, setPatientCount] = React.useState("");

  const renderPatientAttribute = (
    attribute: "id" | "identifier" | "firstName" | "lastName" | "age",
    index: number
  ) => (
    <Cell>
      <React.Fragment>
        <Link to={`${ROUTE_PATIENT}/${patients[index].id}`}>
          {patients[index][attribute] || "unknown"}
        </Link>
      </React.Fragment>
    </Cell>
  );

  React.useEffect(() => {
    const fetchPatients = async () => {
      const patients: Patient[] = await getPatients();
      setPatients(patients);
      const count = await getCount("Patient", { _summary: "count" });
      setPatientCount(count);
    };
    fetchPatients();
  }, []);

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
        {patientCount && `${patientCount} patients identifiés`}
      </div>
    </>
  );
};

export default PatientTable;
