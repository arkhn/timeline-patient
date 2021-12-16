import React from "react";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

type DateInfoProps = {
  date?: string;
};

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(0.8),
    fontSize: 20,
  },
}));

const DateInfo = ({ date }: DateInfoProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.flexContainer}>
      <CalendarTodayIcon fontSize="small" className={classes.icon} />
      <Typography fontSize="0.9rem">{date ?? "?"}</Typography>
    </div>
  );
};

export default DateInfo;
