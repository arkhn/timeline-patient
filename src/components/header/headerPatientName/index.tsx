import * as React from "react";
import { Icon, Navbar as BPNavbar } from "@blueprintjs/core";

interface Props {
  patientId: string;
}

const HeaderPatientName = ({ patientId }: Props) => {
  return (
    <>
      <BPNavbar.Divider />
      <Icon icon="person" />
      {/* TODO : charge name dynamically */}
      <div> {patientId} </div>
    </>
  );
};

export default HeaderPatientName;
