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
    let params = "_count=35";
    searchParams.map((x: any) => {
      switch (x.label) {
        case "Nom": //TODO : find a better solution than hard coded values
          params += "&name";
          switch (x.symbol) {
            case "Contient":
              params += ":contains"; //work
              break;
            case "Exact":
              params += ":exact"; //work
              break;
          }
          params += "=" + x.text;
          return {};
        case "Age": //TODO : find a better solution than hard coded values
          params += "&birthdate";
          const correspondingDate: Date = new Date();
          correspondingDate.setFullYear(
            correspondingDate.getFullYear() - parseInt(x.text)
          );

          const yyyy = correspondingDate.getFullYear();
          const mm =
            (correspondingDate.getMonth() + 1 > 9 ? "" : "0") +
            (correspondingDate.getMonth() + 1);
          const dd =
            (correspondingDate.getDate() > 9 ? "" : "0") +
            correspondingDate.getDate();

          const fhirDateformat = `${yyyy}-${mm}-${dd}`;
          switch (x.symbol) {
            case "=":
              params += ":contains";
              break;
            case ">":
              params += "=lt";
              break;
            case "<":
              params += "=gt";
              break;
          }
          params += fhirDateformat;
          return {};
        default:
          console.info(`Paramètre ${x.label} non reconnu`);
      }
      return {};
    });

    const fetchPatients = async () => {
      const patients: Patient[] = await getPatients(params);
      setPatients(patients);

      const count = await getCount("Patient", params); //todo : adapt after PR merge
      setPatientCount(count);
    };

    fetchPatients();
  };

  React.useEffect(() => {
    const fetchPatients = async () => {
      const patients: Patient[] = await getPatients();
      setPatients(patients);

      const count = await getCount("Patient", "_summary=count");
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
