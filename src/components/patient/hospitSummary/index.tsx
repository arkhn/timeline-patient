import React from "react";
import "./style.css";
import { Icon, H3, H5 } from "@blueprintjs/core";

const HospitSummary = () => {
  return (
    <>
      <div className="fullHeight">
        <H3>
          <Icon icon={"pulse"} /> Hospitalisation
        </H3>
        <div className="centeredName">
          <H5 className="marginRight">{"Chirurgie cardiaque".toUpperCase()}</H5>
          <span className="bp3-text-muted">15/05/2019 - 19/05/2019</span>{" "}
        </div>
        This is the place where the selected hospitalization will be summarised.{" "}
        <br />
        <br />
        The last hospitalization will be shown per default
      </div>
    </>
  );
};

export default HospitSummary;
