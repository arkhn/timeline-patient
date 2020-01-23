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
      <div> {patientId} </div>
    </>
  );
};

export default HeaderPatientName;
