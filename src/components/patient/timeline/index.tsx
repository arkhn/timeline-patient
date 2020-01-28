import React from "react";
import "./style.css";
import { Icon, H3 } from "@blueprintjs/core";

const Timeline = () => {
  return (
    <>
      <div className="bp3-card bp3-elevation-3 timeline">
        <H3>
          <Icon icon={"calendar"} /> Timeline
        </H3>
        The timeline will be drawn here.
      </div>
    </>
  );
};

export default Timeline;
