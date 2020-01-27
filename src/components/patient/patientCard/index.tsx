import React from "react";

import { Card, Elevation, Overlay, Callout } from "@blueprintjs/core";
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
        firstName: "Prenom5",
        lastName: "Nom5",
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
    var patientData;
    for (var i in patientsData)
      if (patientsData[i].id === patientId) patientData = patientsData[i];

    if (patientData === undefined) {
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
          <PatientInfo infoType="Nom" infoContent={patientData.lastName} />
          <PatientInfo infoType="Prénom" infoContent={patientData.firstName} />
          <PatientInfo
            infoType="Identifiant patient"
            infoContent={patientData.id}
          />
          <PatientInfo
            infoType="Age"
            infoContent={patientData.age.toString()}
          />
          <PatientInfo
            infoType="Antécédents"
            infoContent={patientData.medicalHistory}
          />
          <PatientInfo
            infoType="Allergies"
            infoContent={patientData.allergies}
          />
        </>
      );
    }
  };

  return (
    <>
      <Overlay className="pt-overlay-scroll-container" />
      <Card id="patientCard" interactive={false} elevation={Elevation.TWO}>
        {getPatientCard(patientId)}
      </Card>
    </>
  );
};

export default PatientCard;
