import React from "react";
import Header from "components/header";
import PatientTable from "components/patients/patientTable";
import SearchTool from "components/patients/searchTool";
import { getPatients, getCount } from "services/api";
import { Patient } from "types";
import "./style.css";

interface Props {
  onSearch: Function;
  searchItem: any;
}

const Patients = () => {
  const [patients, setPatients] = React.useState([] as Patient[]);
  const [patientCount, setPatientCount] = React.useState("");

  const handleSearch = (searchParams: any) => {
    console.log("searching with parameters : ", searchParams);
    const params: { [k: string]: any } = { _count: 35 };
    searchParams.map((x: any) => {
      switch (x.label) {
        case "Nom": //TODO : find a better solution than hard coded values
          switch (x.symbol) {
            case "Contient":
              params.name = { $contains: x.text }; //not working
              break;
            case "Exact":
              params.name = { $exact: x.text }; //work
              break;
            default:
              params.name = x.text; //work
              break;
          }
          return {};
        default:
          console.log(x.label + " non reconnu");
      }
      return {};
    });

    console.log("params : ", params);
    const fetchPatients = async () => {
      const patients: Patient[] = await getPatients(params);
      setPatients(patients);

      params._summary = "count";
      const count = await getCount("Patient", params);
      setPatientCount(count);
    };

    fetchPatients();
  };

  React.useEffect(() => {
    const fetchPatients = async () => {
      const patients: Patient[] = await getPatients();
      setPatients(patients);

      const count = await getCount("Patient", { _summary: "count" });
      setPatientCount(count);
    };
    fetchPatients();
  }, []);

  return (
    <>
      <Header />
      <div className="homeSearch">
        <div className="searchTool bp3-card bp3-elevation-3">
          <SearchTool onSearch={handleSearch} />
        </div>
        <div className="patientTable bp3-card bp3-elevation-3">
          <PatientTable patients={patients} patientCount={patientCount} />
        </div>
      </div>
    </>
  );
};

export default Patients;
