import React from "react";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  timeline: {
    position: "relative",
    margin: "0 auto",
    "&::after": {
      content: "''",
      position: "absolute",
      width: theme.spacing(1),
      backgroundColor: theme.palette.secondary.contrastText,
      top: 0,
      bottom: 0,
      left: theme.spacing(4),
      borderRadius: 5,
    },
  },
  item: {
    padding: theme.spacing(2, 8),
    position: "relative",
    "&::after": {
      content: "''",
      position: "absolute",
      width: theme.spacing(3),
      height: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      border: `${theme.spacing(0.5)} solid ${theme.palette.primary.main}`,
      top: theme.spacing(3),
      borderRadius: "50%",
      zIndex: 1,
      left: theme.spacing(3),
    },
  },
}));

type TimelineProps = {
  items: React.ReactNodeArray;
};

const Timeline = ({ items }: TimelineProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.timeline}>
      {items.map((item, index) => (
        <div key={`timeline-item-${index}`} className={classes.item}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
