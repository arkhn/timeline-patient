import * as React from "react";
import { Icon, Navbar as BPNavbar } from "@blueprintjs/core";
interface Props {
  patientName: string;
}

const HeaderPatientName = ({ patientName }: Props) => {
  return (
    <>
      <BPNavbar.Divider />
      <Icon icon="person" />
      {/* TODO : charge name dynamically */}
      <div> {patientName} </div>
    </>
  );
};

export default HeaderPatientName;
