import React from "react";
import { Card, Elevation } from "@blueprintjs/core";

import { Patient } from "types";

import Header from "components/header";
import PatientCard from "components/patientPage/patientCard";
import HospitSummary from "components/patientPage/hospitSummary";
import TimelinePatient from "components/patientPage/timelinePatient";
import { getPatientData } from "services/api";

import "./style.css";

interface Props {
  patientId: string;
}

const PatientPage = ({ patientId }: Props) => {
  const [patientData, setPatientData] = React.useState({} as Patient);

  React.useEffect(() => {
    const fetchPatientData = async () => {
      const patient: any = await getPatientData(patientId, true);
      setPatientData(patient);
    };
    fetchPatientData();
  }, [patientId]);

  return (
    <>
      <Header patient={patientData} />
      <div className="patientFill">
        <div className="patientGeneral">
          <Card elevation={Elevation.THREE} className="patientCard">
            <PatientCard patient={patientData} />
          </Card>
          <Card elevation={Elevation.THREE} className="hospitCard">
            <HospitSummary />
          </Card>
        </div>
        <TimelinePatient />
      </div>
    </>
  );
};

export default PatientPage;
