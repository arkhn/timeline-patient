import React from "react";
import Header from "components/header";
import PatientTable from "components/patients/patientTable";
import SearchTool from "components/patients/searchTool";
import { getPatients, getPatientsPerQuery } from "services/api";
import { PatientBundle } from "types";
import { Card, Elevation } from "@blueprintjs/core";

import "./style.css";

interface Props {
  onSearch: Function;
  searchItem: any;
}

const Patients = () => {
  const [patientBundle, setPatientBundle] = React.useState({} as PatientBundle);

  const handleSearch = async (searchNameParams: any, searchParams: any) => {
    const bundle: PatientBundle = await getPatientsPerQuery(
      searchNameParams,
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
          <PatientTable bundle={patientBundle} />
        </Card>
      </div>
    </>
  );
};

export default Patients;
