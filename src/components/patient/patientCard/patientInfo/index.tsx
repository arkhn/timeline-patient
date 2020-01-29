import React from "react";

import { Tag } from "@blueprintjs/core";
import "./style.css";

interface Props {
  type: string;
  content: string;
}

const PatientInfo = ({ type, content }: Props) => {
  return (
    <div className="patientInfo">
      <div className="patientTag">
        <Tag round={true}>{type}</Tag>
      </div>
      <div className="patientInfoContent"> {content} </div>
    </div>
  );
};

export default PatientInfo;
