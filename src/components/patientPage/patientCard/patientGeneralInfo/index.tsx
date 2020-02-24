import React from "react";
import { Tag } from "@blueprintjs/core";

import "./style.css";

interface Props {
  type: string;
  content?: string;
}

const PatientGeneralInfo = ({ type, content }: Props) => {
  if (content)
    return (
      <div className="patientInfo">
        <div className="patientTag">
          <Tag round={true}>{type}</Tag>
        </div>
        <div className="patientInfoContent"> {content} </div>
      </div>
    );
  return (
    <div className="patientInfo">
      <div className="patientTag">
        <Tag round={true}>{type}</Tag>
      </div>
      <div className="patientInfoContent unknownValue"> Inconnu </div>
    </div>
  );
};

export default PatientGeneralInfo;
