import React from "react";

import Header from "components/header";

interface Props {
  patientId: string;
}

const Patient = ({ patientId }: Props) => {
  return (
    <>
      <Header patientId={patientId} />
      <div> {patientId} </div>
    </>
  );
};

export default Patient;
