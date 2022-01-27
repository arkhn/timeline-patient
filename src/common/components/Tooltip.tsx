import React from "react";

import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";

type TooltipProps = Omit<MuiTooltipProps, "title"> & {
  title?: React.ReactNode;
};

const Tooltip = ({ title, children, ...props }: TooltipProps): JSX.Element => {
  return title ? (
    <MuiTooltip title={title} {...props}>
      {children}
    </MuiTooltip>
  ) : (
    children
  );
};

export default Tooltip;
