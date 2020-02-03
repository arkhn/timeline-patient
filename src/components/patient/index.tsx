import React from "react";
import Header from "components/header";
import PatientCard from "components/patient/patientCard";

interface Props {
  patientId: string;
}

const Patient = ({ patientId }: Props) => {
  return (
    <>
      <Header patientId={patientId} />
      <PatientCard patientId={patientId} />
    </>
  );
};

export default Patient;
