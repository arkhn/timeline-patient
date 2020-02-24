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
      <div className="patientInfo">
        <div className="patientTag">
          <Tag round={true}>{type}</Tag>
        </div>
        <div className="patientInfoContent">
          {birthDate}{" "}
          <div className="secondContent"> ({age?.toString()} ans) </div>
        </div>
      </div>
    );
  return (
    <div className="patientInfo">
      <div className="patientTag">
        <Tag round={true}>{type}</Tag>
      </div>
      <div className="patientInfoContent unknownValue"> Inconnue </div>
    </div>
  );
};

export default PatientAgeInfo;
