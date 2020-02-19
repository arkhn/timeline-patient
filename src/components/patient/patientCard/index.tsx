import React from "react";

import { Callout, Icon, H3, H5 } from "@blueprintjs/core";
import PatientInfo from "components/patient/patientCard/patientInfo";
import { DATA_TEST } from "../../../constants";
import { Patient } from "types";
import "./style.css";

interface Props {
  patientId: string;
}

const PatientCard = ({ patientId }: Props) => {
  const [patientsData, setPatientsData] = React.useState([] as Patient[]);

  React.useEffect(() => {
    setPatientsData(DATA_TEST);
  }, []);

  /*
  Function getPatientCard
  Get the PatientData object corresponding to patientId and generate jsx.
  TODO: adapt this function to get data from the rest API

  Return page content with patient data.
  */
  const getPatientCard = (patientId: any) => {
    const patientData = patientsData.find(p => p.id === patientId);

    if (!patientData) {
      return (
        <>
          <Callout title="Donnée non chargées"></Callout>
        </>
      );
    } else {
      // case : rendering, patient found
      return (
        <>
          <div className="centeredName">
            {patientData.lastName && (
              <H5 className="marginRight">
                {patientData.lastName.toUpperCase()}
              </H5>
            )}
            {patientData.firstName && (
              <span className="bp3-text-muted">{patientData.firstName}</span>
            )}
          </div>

          <PatientInfo type="PID" content={patientData.id} />
          {patientData.age && (
            <PatientInfo type="Age" content={patientData.age.toString()} />
          )}
          {patientData.medicalHistory && (
            <PatientInfo
              type="Antécédents"
              content={patientData.medicalHistory}
            />
          )}
          {patientData.allergies && (
            <PatientInfo type="Allergies" content={patientData.allergies} />
          )}
        </>
      );
    }
  };

  return (
    <>
      <div className="fullHeight">
        <H3>
          <Icon icon={"id-number"} /> Informations générales
        </H3>
        {getPatientCard(patientId)}
      </div>
    </>
  );
};

export default PatientCard;
