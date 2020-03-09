import React from "react";
import { Icon, H3, Button } from "@blueprintjs/core";
import { PatientBundle } from "types";
import PatientCardTable from "components/patients/patientTable/patientCardTable";
import { PATIENT_SHOWN } from "../../../constants";
import { requestNextPatients } from "services/api";

import "./style.css";

interface Props {
  bundle: PatientBundle;
  patientCount: string;
}

const PatientTable = ({ bundle, patientCount }: Props) => {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [patientBundle, setPatientBundle] = React.useState(bundle);

  React.useEffect(() => {
    setPatientBundle(bundle);
  }, [bundle]);

  const getNextPage = async () => {
    if ((pageIndex + 2) * PATIENT_SHOWN > bundle.patients.length) {
      const patBundle = (await requestNextPatients(bundle)) as PatientBundle;
      setPatientBundle(patBundle);
    }
    setPageIndex(pageIndex + 1);
  };

  const getPreviousPage = async () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };
  return (
    <>
      <H3>
        <Icon icon={"inbox-search"} className="icon-title" /> Résultats
      </H3>
      {Object.keys(patientBundle).length !== 0 &&
        patientBundle.patients
          .slice(pageIndex * PATIENT_SHOWN, (pageIndex + 1) * PATIENT_SHOWN)
          .map(x => <PatientCardTable patient={x} key={x.id} />)}
      <Button
        className="leftButton"
        icon="direction-left"
        onClick={() => getPreviousPage()}
      >
        Précédent
      </Button>
      <Button
        className="rightButton"
        rightIcon="direction-right"
        onClick={() => getNextPage()}
      >
        Suivant
      </Button>
      <div className="infoPatient">
        {patientCount !== undefined &&
          `${patientCount} patient-e-s identifié-e-s`}
      </div>
    </>
  );
};

export default PatientTable;
