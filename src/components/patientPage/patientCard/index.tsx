import React from "react";

import { Callout, Icon, H3, H5 } from "@blueprintjs/core";
import PatientInfo from "components/patientPage/patientCard/patientInfo";
import { Patient } from "types";
import { getPatientResources, getSubjectResources } from "services/api";

import "./style.css";

interface Props {
  patient: Patient;
}

const PatientCard = ({ patient }: Props) => {
  /*
  getPatientNumberCard and getSubjectNumberCard are now rendering PatientInfo elements with click option which print the results on the console.
  */
  const getPatientNumberCard = (resourceName: string, writtenName: string) => {
    if (patient.number !== undefined)
      if (patient.number[resourceName] !== undefined)
        return (
          <div
            onClick={async () => {
              const response = await getPatientResources(
                resourceName,
                patient.id
              );
              console.log(writtenName + " : ", response.data.entry);
            }}
          >
            <PatientInfo
              type={writtenName}
              content={patient.number[resourceName].toString()}
            />
          </div>
        );
  };

  const getSubjectNumberCard = (resourceName: string, writtenName: string) => {
    if (patient.number !== undefined)
      if (patient.number[resourceName] !== undefined)
        return (
          <div
            onClick={async () => {
              const response = await getSubjectResources(
                resourceName,
                patient.id
              );
              console.log(writtenName + " : ", response.data.entry);
            }}
          >
            <PatientInfo
              type={writtenName}
              content={patient.number[resourceName].toString()}
            />
          </div>
        );
  };

  const getPatientCard = () => {
    /*
    Function getPatientCard
    Get the PatientData object corresponding to patientId and generate jsx.
    TODO: adapt this function to get data from the rest API

    Return page content with patient data.
    */
    if (!patient) {
      return (
        <>
          <Callout title="Données non chargées"></Callout>
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

          {patient.identifier && (
            <PatientInfo type="NIP" content={patient.identifier} />
          )}

          {patient.birthDate && (
            <PatientInfo type="Date de naissance" content={patient.birthDate} />
          )}

          {patient.medicalHistory && (
            <PatientInfo type="Antécédents" content={patient.medicalHistory} />
          )}

          {patient.allergies && (
            <PatientInfo type="Allergies" content={patient.allergies} />
          )}

          {getSubjectNumberCard("AllergyIntolerance", "Allergies")}

          {getPatientNumberCard("Observation", "Observations")}

          {getPatientNumberCard("Condition", "Conditions")}

          {getSubjectNumberCard("EpisodeOfCare", "Hospitalisations")}
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
