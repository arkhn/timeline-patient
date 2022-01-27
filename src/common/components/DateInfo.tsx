import React, { useMemo } from "react";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DateTime } from "luxon";

import { getResourceDateOrPeriod } from "features/resources/utils";
import type { DomainResourceList } from "models/types";

type DateInfoProps = {
  resource: DomainResourceList;
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

const DateInfo = ({ resource }: DateInfoProps): JSX.Element => {
  const classes = useStyles();
  const date = useMemo(() => {
    const dateOrPeriod = getResourceDateOrPeriod(resource);
    if (typeof dateOrPeriod === "string") {
      return DateTime.fromISO(dateOrPeriod).toLocaleString(
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
        {
          locale: navigator.language,
        }
      );
    }

    if (typeof dateOrPeriod === "object") {
      return `${DateTime.fromISO(dateOrPeriod.start).toLocaleString(
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
        {
          locale: navigator.language,
        }
      )} - ${DateTime.fromISO(dateOrPeriod.end).toLocaleString(
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
        {
          locale: navigator.language,
        }
      )}`;
    }
  }, [resource]);
  return (
    <div className={classes.flexContainer}>
      <CalendarTodayIcon fontSize="small" className={classes.icon} />
      <Typography fontSize="0.9rem">{date ?? "?"}</Typography>
    </div>
  );
};

export default DateInfo;
