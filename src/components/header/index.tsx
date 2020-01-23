import { Alignment, Button, Icon, Navbar as BPNavbar } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";
import HeaderPatientName from "components/headerPatientName";

import "./style.css";

interface Props {
  patientId: string;
}

const Header = ({ patientId }: Props) => {
  var headerPatient;
  if (patientId === "") {
    headerPatient = "";
  } else {
    headerPatient = <HeaderPatientName patientId={patientId} />;
  }

  return (
    <BPNavbar id="navbar" className="bp3-dark">
      <BPNavbar.Group align={Alignment.LEFT}>
        <BPNavbar.Heading>
          <Link
            style={{ textDecoration: "none", color: "white", display: "flex" }}
            to="/"
          >
            <img
              id="logoNavbar"
              src={process.env.PUBLIC_URL + "/arkhn_logo_only_white.svg"}
              alt="Arkhn"
            />
            <h3 id="titleNavbar">TIMELINE</h3>
          </Link>
        </BPNavbar.Heading>
        {headerPatient}
      </BPNavbar.Group>

      <BPNavbar.Group align={Alignment.RIGHT}>
        <Icon icon="user" />
        <div>Nom médecin</div>
        <BPNavbar.Divider />
        <Button icon="more" minimal />
        <Button icon="log-out" minimal />
      </BPNavbar.Group>
    </BPNavbar>
  );
};

export default Header;
