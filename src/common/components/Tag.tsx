import React from "react";

import { Typography } from "@mui/material";
import { CSSProperties, DefaultTheme, makeStyles } from "@mui/styles";

type TagProps = {
  value?: string;
  color?: CSSProperties["color"];
};

const useStyles = makeStyles<DefaultTheme, { color?: CSSProperties["color"] }>(
  (theme) => ({
    tagContainer: {
      width: "fit-content",
      paddingInline: theme.spacing(2),
      paddingBlock: theme.spacing(1),
      borderRadius: 50,
      marginRight: theme.spacing(1),
      backgroundColor: (props) => props.color,
    },
    tag: {
      color: (props) =>
        props.color && theme.palette.getContrastText(props.color),
    },
  })
);

const Tag = ({ value, color }: TagProps): JSX.Element => {
  const classes = useStyles({ color });
  return (
    <div className={classes.tagContainer}>
      <Typography className={classes.tag}>{value}</Typography>
    </div>
  );
};

export default Tag;
