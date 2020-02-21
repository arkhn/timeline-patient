import React from "react";

import { Callout, Icon, H3, H5 } from "@blueprintjs/core";
import PatientInfo from "components/patientPage/patientCard/patientInfo";
import { Patient } from "types";

import "./style.css";

interface Props {
  patient: Patient;
}

const PatientCard = ({ patient }: Props) => {
  /*
  Function getPatientCard
  Get the PatientData object corresponding to patientId and generate jsx.
  TODO: adapt this function to get data from the rest API

  Return page content with patient data.
  */

  const getAllergiesCard = () => {
    if (patient.allergiesNumber !== undefined)
      return (
        <PatientInfo
          type="Allergies"
          content={patient.allergiesNumber.toString()}
        />
      );
  };

  const getObservationsCard = () => {
    if (patient.observationsNumber !== undefined)
      return (
        <PatientInfo
          type="Observations"
          content={patient.observationsNumber.toString()}
        />
      );
  };

  const getConditionsCard = () => {
    if (patient.conditionsNumber !== undefined)
      return (
        <PatientInfo
          type="Conditions"
          content={patient.conditionsNumber.toString()}
        />
      );
  };

  const getPatientCard = () => {
    if (!patient) {
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
            {patient.lastName && (
              <H5 className="marginRight">{patient.lastName.toUpperCase()}</H5>
            )}
            {patient.firstName && (
              <span className="bp3-text-muted">{patient.firstName}</span>
            )}
          </div>
          <PatientInfo type="PID" content={patient.id} />
          {patient.age && (
            <PatientInfo type="Age" content={patient.age.toString()} />
          )}
          {patient.medicalHistory && (
            <PatientInfo type="Antécédents" content={patient.medicalHistory} />
          )}
          {patient.allergies && (
            <PatientInfo type="Allergies" content={patient.allergies} />
          )}
          {getAllergiesCard()}

          {getObservationsCard()}

          {getConditionsCard()}
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
        {getPatientCard()}
      </div>
    </>
  );
};

export default PatientCard;
