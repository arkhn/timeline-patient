import React from "react";
import { Icon, H3 } from "@blueprintjs/core";
import { Patient } from "types";
import PatientCardTable from "components/patients/patientTable/patientCardTable";

import "./style.css";

interface Props {
  patients: Patient[];
  patientCount: string;
}

const PatientTable = ({ patients, patientCount }: Props) => {
  return (
    <>
      <H3>
        <Icon icon={"inbox-search"} className="icon-title" /> Résultats
      </H3>

      {patients.map(x => (
        <PatientCardTable patient={x} key={x.id} />
      ))}

      <div className="infoPatient">
        {patientCount !== undefined &&
          `${patientCount} patient-e-s identifié-e-s`}
      </div>
    </>
  );
};

export default PatientTable;
