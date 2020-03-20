import React from "react";
import Header from "components/header";
import PatientTable from "components/patients/patientTable";
import SearchTool from "components/patients/searchTool";
import {
  getPatients,
  getPatientsPerQuery,
  requestNextPatients
} from "services/api";
import { PatientBundle } from "types";
import { Card, Elevation } from "@blueprintjs/core";

import "./style.css";

interface Props {
  onSearch: Function;
  searchItem: any;
}

const Patients = () => {
  const [patientBundle, setPatientBundle] = React.useState({} as PatientBundle);
  const getNextPatients = async () => {
    const patBundle = await requestNextPatients(patientBundle);
    if (patBundle) setPatientBundle(patBundle);
  };
  const handleSearch = async (searchName: String, searchParams: any) => {
    const bundle: PatientBundle = await getPatientsPerQuery(
      searchName,
      searchParams
    );
    setPatientBundle(bundle);
  };

  React.useEffect(() => {
    const fetchPatients = async () => {
      const bundle: PatientBundle = await getPatients();
      setPatientBundle(bundle);
    };
    fetchPatients();
  }, []);

  return (
    <>
      <Header />
      <div className="homeSearch">
        <Card elevation={Elevation.ZERO} className="searchTool">
          <SearchTool onSearch={handleSearch} />
        </Card>
        <Card elevation={Elevation.ZERO} className="patientTable">
          <PatientTable
            bundle={patientBundle}
            updateNextPatients={getNextPatients}
          />
        </Card>
      </div>
    </>
  );
};

export default Patients;
