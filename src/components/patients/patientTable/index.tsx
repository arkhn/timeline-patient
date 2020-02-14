import React from "react";
import { Link } from "react-router-dom";
import { Cell, Column, Table } from "@blueprintjs/table";
import { Icon, H3 } from "@blueprintjs/core";
import { ROUTE_PATIENT } from "../../../constants";
import { getPatients } from "services/api";
import { Patient } from "types";

import "./style.css";

const PatientTable = () => {
  const [patients, setPatients] = React.useState([] as Patient[]);

  const renderPatientAttribute = (
    attribute: "id" | "firstName" | "lastName" | "age",
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
  const calculateAge = (birthday: any) => {
    // birthday is a date
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  React.useEffect(() => {
    const fetchPatients = async () => {
      const patients: Patient[] = await getPatients();
      setPatients(patients);
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
          enableRowReordering={true}
          enableRowResizing={false}
          numRows={patients.length}
        >
          <Column
            key="id"
            name="Identifiant"
            cellRenderer={(index: number) =>
              renderPatientAttribute("id", index)
            }
          />
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
