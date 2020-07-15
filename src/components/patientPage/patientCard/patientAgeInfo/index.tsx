import React from "react";
import { Tag } from "@blueprintjs/core";

import "./style.css";

interface Props {
  type: string;
  birthDate?: string;
  age?: number;
}

const PatientAgeInfo = ({ type, birthDate, age }: Props) => {
  if (birthDate)
    return (
      <div className="patientAge">
        <div>{type.toUpperCase()}</div>
        <div className="patientAgeContent">
          {birthDate}
          <div className="secondContent"> ({age?.toString()} ans) </div>
        </div>
      </div>
    );
  return (
    <div className="patientAge">
      <div className="patientTag">
        <Tag round={true}>{type}</Tag>
      </div>
      <div className="patientAgeContent unknownValue"> Inconnue </div>
    </div>
  );
};

export default PatientAgeInfo;
