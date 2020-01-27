import React from "react";

import { Tag } from "@blueprintjs/core";
import "./style.css";

interface Props {
  infoType: string;
  infoContent: string;
}

const PatientInfo = ({ infoType, infoContent }: Props) => {
  return (
    <>
      <div className="patientInfo">
        <div className="patientTag">
          <Tag round={true}>{infoType}</Tag>
        </div>
        <div className="patientInfoContent"> {infoContent} </div>
      </div>
    </>
  );
};

export default PatientInfo;
