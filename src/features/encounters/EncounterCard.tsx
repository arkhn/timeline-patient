import React, { useMemo } from "react";

import type { IEncounter } from "@ahryman40k/ts-fhir-types/lib/R4";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

import Tag from "common/components/Tag";

import { TERMINOLOGY_SYSTEM_URL } from "../../constants";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

type EncounterCardProps = {
  encounter: IEncounter;
};

const EncounterCard = ({ encounter }: EncounterCardProps): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { period, meta, location, resourceType } = encounter;
  const { startPeriod, endPeriod } = useMemo(
    () => ({
      startPeriod:
        period?.start &&
        DateTime.fromISO(period.start).toLocaleString(
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
          {
            locale: navigator.language,
          }
        ),
      endPeriod:
        period?.end &&
        DateTime.fromISO(period.end).toLocaleString(
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
          {
            locale: navigator.language,
          }
        ),
    }),
    [period]
  );
  const softwareName = useMemo(
    () =>
      meta?.tag?.find(({ system }) => system === TERMINOLOGY_SYSTEM_URL)
        ?.display,
    [meta]
  );
  const locationName = useMemo(
    () => location?.[0]?.location.display,
    [location]
  );
  return (
    <Card>
      <CardHeader
        disableTypography
        title={
          <div className={classes.flexContainer}>
            <Tag value={t(resourceType)} color="#555" />
            {locationName && (
              <Typography display="inline" variant="h5">
                {locationName}
              </Typography>
            )}
          </div>
        }
      />
      <CardContent>
        {period && (
          <div className={classes.flexContainer}>
            <CalendarTodayIcon className={classes.icon} />
            <Typography display="inline">
              {[startPeriod, endPeriod]
                .filter((periodValue) => !!periodValue)
                .join(" - ")}
            </Typography>
          </div>
        )}
        {softwareName && (
          <Typography variant="caption">
            {t("software")}: {softwareName}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default EncounterCard;
