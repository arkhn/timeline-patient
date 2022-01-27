import React from "react";

import { Typography } from "@mui/material";
import { CSSProperties, DefaultTheme, makeStyles } from "@mui/styles";

type TagProps = {
  value?: string;
  color?: CSSProperties["color"];
  size?: "normal" | "small";
};

const useStyles = makeStyles<
  DefaultTheme,
  { color?: CSSProperties["color"]; size: "normal" | "small" }
>((theme) => ({
  tagContainer: {
    width: "fit-content",
    paddingTop: (props) =>
      props.size === "small" ? theme.spacing(0.4) : theme.spacing(1),
    paddingBottom: (props) =>
      props.size === "small" ? theme.spacing(0.3) : theme.spacing(0.8),
    paddingInline: (props) =>
      props.size === "small" ? theme.spacing(0.8) : theme.spacing(1.5),
    borderRadius: 50,
    marginRight: (props) =>
      props.size === "small" ? theme.spacing(0.6) : theme.spacing(1),
    backgroundColor: (props) => props.color,
  },
  tag: {
    color: (props) => props.color && theme.palette.getContrastText(props.color),
    fontSize: (props) => (props.size === "small" ? "0.75rem" : "0.9rem"),
  },
}));

const Tag = ({ value, color, size = "normal" }: TagProps): JSX.Element => {
  const classes = useStyles({ color, size });
  return (
    <div className={classes.tagContainer}>
      <Typography className={classes.tag}>{value}</Typography>
    </div>
  );
};

export default Tag;
