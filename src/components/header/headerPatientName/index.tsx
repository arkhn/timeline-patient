import * as React from "react";
import { Icon, Navbar as BPNavbar } from "@blueprintjs/core";
import { Patient } from "types";
interface Props {
  patient: Patient;
}

const HeaderPatientName = ({ patient }: Props) => {
  return (
    <>
      <BPNavbar.Divider />
      <Icon icon="person" />
      {/* TODO : charge name dynamically */}
      <div>
        {patient.lastName && patient.lastName + " "}
        {patient.firstName && patient.firstName}
      </div>
    </>
  );
};

export default HeaderPatientName;
