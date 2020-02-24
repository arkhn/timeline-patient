import React from "react";
import Header from "components/header";
import PatientTable from "components/patients/patientTable";
import SearchTool from "components/patients/searchTool";
import "./style.css";

const Patients = () => {
  return (
    <>
      <Header />
      <div className="homeSearch">
        <div className="searchTool bp3-card bp3-elevation-3">
          <SearchTool />
        </div>
        <div className="patientTable bp3-card bp3-elevation-3">
          <PatientTable />
        </div>
      </div>
    </>
  );
};

export default Patients;
