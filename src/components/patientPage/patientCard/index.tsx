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
    const resourceNumber = patient[object] ? patient[object].length : 0;

    return (
      <div>
        <PatientGeneralInfo type={`${writtenName}`} content={resourceNumber} />
      </div>
    );
  };

  const getSubjectNameDiv = () => {
    if (!patient.lastName && !patient.firstName)
      return (
        <div className="centeredName">
          <H3 className="marginRight">Nom inconnu</H3>
        </div>
      );

    return (
      <div className="centeredName">
        <div className="marginRight">
          <H3>{patient.lastName?.toUpperCase()}</H3>
          <H5 className="marginRight">{`${patient.firstName}`}</H5>
          {patient.identifier && `NIR : ${patient.identifier}`}
        </div>
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
    let gender;
    if (patient.gender === "female") {
      gender = "Femme";
    } else if (patient.gender === "male") {
      gender = "Homme";
    }

    if (!patient) {
      return <Callout title="Données non chargées"></Callout>;
    }
    // case : rendering, patient found
    return (
      <>
        {getSubjectNameDiv()}
        <hr></hr>
        {
          <PatientAgeInfo
            type="Date de naissance"
            birthDate={patient.birthDate}
            age={patient.age}
          />
        }
        {gender && <PatientGeneralInfo type={`Sexe`} content={gender} />}
        {patient.address && (
          <PatientGeneralInfo type={`Adresse`} content={patient.address} />
        )}
        {patient.telecom && (
          <PatientGeneralInfo type={`Contact`} content={patient.telecom} />
        )}
        <hr></hr>

        {getPatientNumberCard("allergyIntolerances", "Nombre d'allergies")}

        {getPatientNumberCard("observations", "Nombre d'observations")}

        {getPatientNumberCard("conditions", "Nombre de conditions")}

        {getPatientNumberCard("episodesOfCare", "Nombre d'hospitalisation")}
      </>
    );
  };

  return (
    <>
      <div className="fullHeight">{getPatientCard()}</div>
    </>
  );
};

export default PatientCard;
