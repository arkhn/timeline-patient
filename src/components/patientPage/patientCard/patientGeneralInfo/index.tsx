import React from "react";

import "./style.css";

interface Props {
  type: string;
  content?: string | [];
}

const PatientGeneralInfo = ({ type, content }: Props) => {
  const getContent = () => {
    if (Array.isArray(content)) {
      return content.map((x: any) => (
        <div className="patientInfoContent"> {x} </div>
      ));
    } else {
      return <div className="patientInfoContent"> {content} </div>;
    }
  };
  if (content !== undefined)
    //Avoid to write "Inconnu" instead of 0
    return (
      <div className="patientInfo">
        <div className="patientTag">{type.toUpperCase()}</div>
        {getContent()}
      </div>
    );
  return (
    <div className="patientInfo">
      <div className="patientTag">{type}</div>
      <div className="patientInfoContent unknownValue"> Inconnu </div>
    </div>
  );
};

export default PatientGeneralInfo;
