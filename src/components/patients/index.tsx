import React from "react";
import Header from "components/header";
import PatientTable from "components/patients/patientTable";
import SearchTool from "components/patients/searchTool";
import { getPatients, getCount } from "services/api";
import { Patient } from "types";
import { Card, Elevation } from "@blueprintjs/core";
import { PATIENT_SHOWN } from "../../constants";

import "./style.css";

interface Props {
  onSearch: Function;
  searchItem: any;
}

const Patients = () => {
  const [patients, setPatients] = React.useState([] as Patient[]);
  const [patientCount, setPatientCount] = React.useState("");

  const handleSearch = async (searchNameParams: any, searchParams: any) => {
    let params = "_count=" + PATIENT_SHOWN;

    if (searchNameParams.text) {
      params = "_count=10000";
      searchNameParams.text.split(" ").map((x: string) => {
        params += "&name=" + x;
        return params;
      });
      let patients: Patient[] = await getPatients(params);
      patients = patients.concat(await getPatients(params));
      patients = patients.concat(await getPatients(params));

      setPatients(patients.slice(0, PATIENT_SHOWN));

      setPatientCount(patients.length.toString());
    } else {
      searchParams.map((x: any) => {
        switch (x.label) {
          case "Age":
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
          default:
            console.info(`Paramètre ${x.label} non reconnu`);
        }
        return {};
      });
      const patients: Patient[] = await getPatients(params);
      setPatients(patients);

      const count = await getCount("Patient", params);
      setPatientCount(count);
    }
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
