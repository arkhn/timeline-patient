import { Alignment, Button, Icon, Navbar as BPNavbar } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";
import HeaderPatientName from "components/header/headerPatientName";

import "./style.css";

import { paths } from "constants/routes";

interface Props {
  patientId?: string;
}

const Header = ({ patientId }: Props) => {
  return (
    <BPNavbar id="navbar" className="bp3-dark">
      <BPNavbar.Group align={Alignment.LEFT}>
        <BPNavbar.Heading>
          <Link className="linkNavbar" to={paths.home}>
            <img
              id="logoNavbar"
              src={"/arkhn_logo_only_white.svg"}
              alt="Arkhn"
            />
            <h3 id="titleNavbar">TIMELINE</h3>
          </Link>
        </BPNavbar.Heading>
        {/* TODO: update replace patientId with patient name dynamically */}
        {patientId && <HeaderPatientName patientId={patientId} />}
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
