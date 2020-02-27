import React from "react";
import Header from "components/header";
import PatientTable from "components/patients/patientTable";
import SearchTool from "components/patients/searchTool";
import { Card, Elevation } from "@blueprintjs/core";
import "./style.css";

const Patients = () => {
  return (
    <>
      <Header />
      <div className="homeSearch">
        <Card elevation={Elevation.THREE} className="searchTool">
          <SearchTool />
        </Card>
        <Card elevation={Elevation.THREE} className="patientTable">
          <PatientTable />
        </Card>
      </div>
    </>
  );
};

export default Patients;
