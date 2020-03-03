import React from "react";
import { Icon, H3, H5 } from "@blueprintjs/core";
import "./style.css";

const HospitSummary = () => {
  return (
    <div className="fullHeight">
      <H3>
        <Icon icon={"pulse"} /> Hospitalisation
      </H3>
      <div className="centeredName">
        <H5 className="marginRight">{"Chirurgie cardiaque".toUpperCase()}</H5>
        <span className="bp3-text-muted">15/05/2019 - 19/05/2019</span>
      </div>
      Les informations sur l'hospitalisation sélectionnée seront indiquées ici.
      <br />
      <br />
      Par défaut, cette carte affichera les infos de la dernière
      hospitalisation.
    </div>
  );
};

export default HospitSummary;
