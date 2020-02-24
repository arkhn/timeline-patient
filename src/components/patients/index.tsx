import React from "react";
import Header from "components/header";
import PatientTable from "components/patients/patientTable";
import SearchTool from "components/patients/searchTool";
import { getPatients, getCount } from "services/api";
import { Patient } from "types";
import { Card, Elevation } from "@blueprintjs/core";
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
          switch (x.symbol) {
            case "Contient":
              params += `&name:contains=${x.text}`;
              break;
            case "Exact":
              params += `&name:exact=${x.text}`;
              break;
            default:
              params += `&name=${x.text}`;
              break;
          }
          return {};
        case "Age": //TODO : find a better solution than hard coded values
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

          switch (x.symbol) {
            case "=":
              params += `&birthdate=lt${yyyy}-${mm}-${dd}`;
              params += `&birthdate=gt${yyyy - 1}-${mm}-${dd}`;
              break;
            case "≠": //not working for now
              params += `&birthdate=gt${yyyy}-${mm}-${dd},lt${yyyy -
                1}-${mm}-${dd}`;
              break;
            case ">":
              params += `&birthdate=lt${yyyy}-${mm}-${dd}`;
              break;
            case "<":
              params += `&birthdate=gt${yyyy}-${mm}-${dd}`;
              break;
          }
          return {};
        case "Logical id":
          params += `&_id=${x.text}`;
          break;
        case "Identifier":
          params += `&identifier=${x.text}`;
          break;
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
        <Card elevation={Elevation.THREE} className="searchTool">
          <SearchTool onSearch={handleSearch} />
        </Card>
        <Card elevation={Elevation.THREE} className="patientTable">
          <PatientTable patients={patients} patientCount={patientCount} />
        </Card>
      </div>
    </>
  );
};

export default Patients;
