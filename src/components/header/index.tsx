import { Alignment, Button, Icon, Navbar as BPNavbar } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";
import HeaderPatientName from "components/header/headerPatientName";
import { DATA_TEST } from "constants/dataTest";
import { ROUTE_HOME } from "constants/routes";
import "./style.css";

interface Props {
  patientId?: string;
}

interface Patient {
  firstName: string;
  lastName: string;
  id: string;
  age: number;
  medicalHistory: string;
  allergies: string;
}

const Header = ({ patientId }: Props) => {
  const patient = DATA_TEST.find(p => p.id === patientId);

  return (
    <BPNavbar id="navbar" className="bp3-dark">
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
        {patient && (
          <HeaderPatientName
            patientName={`${patient.lastName} ${patient.firstName}`}
          />
        )}
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
