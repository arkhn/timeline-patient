import React from "react";

import Header from "components/header";

interface Props {
  patientId: string;
}

const Patient = ({ patientId }: Props) => {
  console.log(patientId);
  return (
    <>
      <Header />
      <div> {patientId} </div>
    </>
  );
};

export default Patient;
