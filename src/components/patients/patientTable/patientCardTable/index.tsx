import React from "react";
import { Icon, Card, H5, Tag } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { ROUTE_PATIENT } from "../../../../constants";

import { Patient } from "types";

import "./style.css";

interface Props {
  patient: Patient;
}

const PatientCardTable = ({ patient }: Props) => {
  const getSubjectNameDiv = () => {
    if (!patient.lastName && !patient.firstName)
      return (
        <div className="aligned">
          <Icon icon="id-number" />
          <H5 className="marginRight">Nom inconnu</H5>
        </div>
      );

    return (
      <div className="aligned">
        <Icon icon="id-number" />
        <H5>{patient.lastName}</H5>
        <span className="bp3-text-muted">{patient.firstName}</span>
      </div>
    );
  };
  const getPatientCard = () => {
    /*
    Function getPatientCard
    Get the PatientData object corresponding to patientId and generate jsx.
    TODO: adapt this function to get data from the rest API

    Return page content with patient data.
    */
    // case : rendering, patient found
    return (
      <>
        <div className="nameCard">{getSubjectNameDiv()}</div>

        <div className="nipCard">
          {patient.identifier && (
            <>
              <Tag round={true}>NIP</Tag>
              <div className="nipText">{patient.identifier}</div>
            </>
          )}
        </div>

        <div className="birthDateCard">
          {patient.birthDate && (
            <>
              <Tag round={true}>Date de naissance</Tag>
              <div> {patient.birthDate}</div>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <Link to={`${ROUTE_PATIENT}/${patient.id}`} className="disabled-link-style">
      <Card interactive={true} className="card aligned">
        {getPatientCard()}
      </Card>
    </Link>
  );
};

export default PatientCardTable;
