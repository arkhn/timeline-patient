import { Alignment, Button, Icon, Navbar as BPNavbar } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";
import HeaderPatientName from "components/header/headerPatientName";
import { ROUTE_HOME } from "../../constants";
import { Patient } from "types";

import "./style.css";

interface Props {
  patient?: Patient;
}

const Header = ({ patient }: Props) => {
  return (
    <BPNavbar id="navbar">
      <BPNavbar.Group align={Alignment.LEFT}>
        <BPNavbar.Heading>
          <Link className="linkNavbar" to={ROUTE_HOME}>
            <img
              id="logoNavbar"
              src={"/arkhn_logo_only_white.svg"}
              alt="Arkhn"
            />
            <h3 id="titleNavbar">TIMELINE</h3>
          </Link>
        </BPNavbar.Heading>
        {patient && <HeaderPatientName patient={patient} />}
      </BPNavbar.Group>

      <BPNavbar.Group align={Alignment.RIGHT}>
        <Icon icon="user" />
        <div>Nom médecin</div>
        <BPNavbar.Divider />
        <Button icon="more" minimal className="headerButtons" />
        <Button icon="log-out" minimal className="headerButtons" />
      </BPNavbar.Group>
    </BPNavbar>
  );
};

export default Header;
