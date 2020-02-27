import * as React from "react";
import { Icon, Navbar as BPNavbar } from "@blueprintjs/core";

import { Patient } from "types";

interface Props {
  patient: Patient;
}

const HeaderPatientName = ({ patient }: Props) => {
  let patientName;
  if (!patient.lastName && !patient.firstName) patientName = "Nom inconnu";
  else patientName = `${patient.lastName} ${patient.firstName}`;

  return (
    <>
      <BPNavbar.Divider />
      <Icon icon="person" />
      {/* TODO : charge name dynamically */}
      <div>{patientName}</div>
    </>
  );
};

export default HeaderPatientName;
