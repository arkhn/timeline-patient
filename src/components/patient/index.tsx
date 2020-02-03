import React from "react";
import Header from "components/header";
import PatientCard from "components/patient/patientCard";
import HospitSummary from "components/patient/hospitSummary";
import TimelinePatient from "components/patient/timelinePatient";
import "./style.css";

interface Props {
  patientId: string;
}

const Patient = ({ patientId }: Props) => {
  return (
    <>
      <Header patientId={patientId} />
      <div className="patientFill">
        <div className="patientGeneral">
          <div className="patientCard bp3-card bp3-elevation-3 ">
            <PatientCard patientId={patientId} />
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

export default Patient;
