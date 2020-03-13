import React from "react";
import { Icon, H3, Button } from "@blueprintjs/core";
import { PatientBundle } from "types";
import PatientCardTable from "components/patients/patientTable/patientCardTable";
import { PATIENT_SHOWN } from "../../../constants";

import "./style.css";

interface Props {
  bundle: PatientBundle;
  updateNextPatients: Function;
}

const PatientTable = ({ bundle, updateNextPatients }: Props) => {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [leftDisabled, setLeftDisabled] = React.useState(true);

  const getNextPage = async () => {
    if ((pageIndex + 2) * PATIENT_SHOWN >= bundle.patients.length) {
      updateNextPatients();
    }
    setPageIndex(pageIndex + 1);
    setLeftDisabled(false);
  };

  const getPatientCardTable = () => {
    const patientcards =
      Object.keys(bundle).length !== 0 &&
      bundle.patients
        .slice(pageIndex * PATIENT_SHOWN, (pageIndex + 1) * PATIENT_SHOWN)
        .map(x => <PatientCardTable patient={x} key={x.id} />);

    return patientcards;
  };

  const getPreviousPage = async () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
    if (pageIndex <= 0) setLeftDisabled(true);
  };
  return (
    <>
      <H3>
        <Icon icon={"inbox-search"} className="icon-title" /> Résultats
      </H3>
      {getPatientCardTable()}
      <Button
        className="leftButton"
        icon="direction-left"
        onClick={() => getPreviousPage()}
        disabled={leftDisabled}
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
        {bundle.total !== undefined &&
          `${bundle.total} patient-e-s identifié-e-s`}
      </div>
    </>
  );
};

export default PatientTable;
