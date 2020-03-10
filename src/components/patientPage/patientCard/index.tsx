import React from "react";
import { Callout, Icon, H3, H5 } from "@blueprintjs/core";

import PatientGeneralInfo from "components/patientPage/patientCard/patientGeneralInfo";
import PatientAgeInfo from "components/patientPage/patientCard/patientAgeInfo";
import { Patient } from "types";

import "./style.css";

interface Props {
  patient: Patient;
}

const PatientCard = ({ patient }: Props) => {
  /*
  getPatientNumberCard and getSubjectNumberCard are now rendering PatientInfo elements with click option which print the results on the console.
  */
  const getPatientNumberCard = (
    object:
      | "observations"
      | "conditions"
      | "allergyIntolerances"
      | "episodesOfCare",
    writtenName: string
  ) => {
    let resourceNumber: string = "";
    if (patient[object]) {
      resourceNumber = patient[object].length;
    } else resourceNumber = "0";

    return (
      <div
        onClick={() => {
          console.log(writtenName + " : ", patient[object]);
        }}
      >
        <PatientGeneralInfo type={writtenName} content={resourceNumber} />
      </div>
    );
  };

  const getSubjectNameDiv = () => {
    if (!patient.lastName && !patient.firstName)
      return (
        <div className="centeredName">
          <H5 className="marginRight">Nom inconnu</H5>
        </div>
      );

    return (
      <div className="centeredName">
        <H5 className="marginRight">{patient.lastName}</H5>

        <span className="bp3-text-muted">{patient.firstName}</span>
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
      return <Callout title="Données non chargées"></Callout>;
    }
    // case : rendering, patient found
    return (
      <>
        {getSubjectNameDiv()}

        {patient.identifier && (
          <PatientGeneralInfo type="NIP" content={patient.identifier} />
        )}

        {
          <PatientAgeInfo
            type="Date de naissance"
            birthDate={patient.birthDate}
            age={patient.age}
          />
        }


        {getPatientNumberCard("allergyIntolerances", "Allergies")}

        {getPatientNumberCard("observations", "Observations")}

        {getPatientNumberCard("conditions", "Conditions")}

        {getPatientNumberCard("episodesOfCare", "Hospitalisations")}

      </>
    );
  };

  return (
    <>
      <div className="fullHeight">
        <H3>
          <Icon icon="id-number" /> Informations générales
        </H3>
        {getPatientCard()}
      </div>
    </>
  );
};

export default PatientCard;
