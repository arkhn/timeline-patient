import React from "react";

import { Callout, Icon, H3, H5 } from "@blueprintjs/core";
import PatientInfo from "components/patient/patientCard/patientInfo";
import "./style.css";

interface PatientData {
  firstName: string;
  lastName: string;
  id: string;
  age: number;
  medicalHistory: string;
  allergies: string;
}

interface Props {
  patientId: string;
}

const PatientCard = ({ patientId }: Props) => {
  const [patientsData, setPatientsData] = React.useState([] as PatientData[]);

  React.useEffect(() => {
    var data = [
      {
        firstName: "Prenom1",
        lastName: "Nom1",
        id: "1",
        age: 5,
        medicalHistory: "21 trisomy",
        allergies: "None"
      },
      {
        firstName: "Prenom2",
        lastName: "Nom2",
        id: "2",
        age: 10,
        medicalHistory: "None",
        allergies: "Grass, Penicillin"
      },
      {
        firstName: "Prenom3",
        lastName: "Nom3",
        id: "3",
        age: 56,
        medicalHistory: "None",
        allergies: "None"
      },
      {
        firstName: "Prenom4",
        lastName: "Nom4",
        id: "4",
        age: 36,
        medicalHistory: "Wrist fracture",
        allergies: "None"
      },
      {
        firstName: "Jean",
        lastName: "Dupont",
        id: "5",
        age: 17,
        medicalHistory:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        allergies:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
      },
      {
        firstName: "Prenom6",
        lastName: "Nom6",
        id: "6",
        age: 96,
        medicalHistory: "Type 2 diabetes, Stroke",
        allergies: "None"
      }
    ];

    setPatientsData(data);
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
          <Callout title="Patient not found" intent="danger">
            Le patient avec l'identifiant "{patientId}" n'a pas été trouvé.
          </Callout>
        </>
      );
    } else {
      return (
        <>
          <div className="centeredName">
            <H5 className="marginRight">
              {patientData.lastName.toUpperCase()}
            </H5>
            <span className="bp3-text-muted">{patientData.firstName}</span>{" "}
          </div>

          <PatientInfo type="PID" content={patientData.id} />
          <PatientInfo type="Age" content={patientData.age.toString()} />
          <PatientInfo
            type="Antécédents"
            content={patientData.medicalHistory}
          />
          <PatientInfo type="Allergies" content={patientData.allergies} />
          <PatientInfo type="Allergies" content={patientData.allergies} />
        </>
      );
    }
  };

  return (
    <>
      <div className="fullHeight">
        <H3>
          <Icon icon={"id-number"} /> Informations générales{" "}
        </H3>
        {getPatientCard(patientId)}
      </div>
    </>
  );
};

export default PatientCard;
