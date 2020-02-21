import React from "react";
import Header from "components/header";
import PatientCard from "components/patientPage/patientCard";
import HospitSummary from "components/patientPage/hospitSummary";
import TimelinePatient from "components/patientPage/timelinePatient";
import { Patient } from "types";
import { getPatientData } from "services/api";

import "./style.css";

interface Props {
  patientId: string;
}

const PatientPage = ({ patientId }: Props) => {
  const [patientData, setPatientData] = React.useState({} as Patient);

  React.useEffect(() => {
    const fetchPatientData = async () => {
      const patient: Patient = await getPatientData(patientId);
      setPatientData(patient);
    };
    fetchPatientData();
  }, [patientId]);

  return (
    <>
      <Header patient={patientData} />
      <div className="patientFill">
        <div className="patientGeneral">
          <div className="patientCard bp3-card bp3-elevation-3 ">
            <PatientCard patient={patientData} />
          </div>
          <div className="hospitCard bp3-card bp3-elevation-3 ">
            <HospitSummary />
          </div>
        </div>
        <TimelinePatient />
      </div>
    </>
  );
};

export default PatientPage;
