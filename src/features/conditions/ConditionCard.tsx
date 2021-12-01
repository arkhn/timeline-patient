import React, { useMemo } from "react";

import type { ICondition } from "@ahryman40k/ts-fhir-types/lib/R4";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

import Tag from "common/components/Tag";
import ResourceCardActions from "features/resources/ResourceCardActions";

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

type ConditionCardProps = {
  condition: ICondition;
};

const ConditionCard = ({ condition }: ConditionCardProps): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { code, meta, onsetDateTime, resourceType } = condition;
  const { codeTag, codeTitle } = useMemo(
    () => ({
      codeTag: `${code?.coding?.[0]?.system}-${code?.coding?.[0]?.code}`,
      codeTitle: code?.coding?.[0]?.display,
    }),
    [code]
  );
  const softwareName = useMemo(
    () =>
      meta?.tag?.find(({ system }) => system === TERMINOLOGY_SYSTEM_URL)
        ?.display,
    [meta]
  );
  const conditionDate = useMemo(
    () =>
      onsetDateTime &&
      DateTime.fromISO(onsetDateTime).toLocaleString(
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
        {
          locale: navigator.language,
        }
      ),
    [onsetDateTime]
  );
  return (
    <Card>
      <CardHeader
        disableTypography
        title={
          <div className={classes.flexContainer}>
            {<Tag value={t(resourceType)} color="#555" />}
            {codeTag && <Tag value={codeTag} color="#CCC" />}
            {codeTitle && (
              <Typography display="inline" variant="h5">
                {codeTitle}
              </Typography>
            )}
          </div>
        }
        subheader={
          onsetDateTime && (
            <div className={classes.flexContainer}>
              <CalendarTodayIcon fontSize="small" className={classes.icon} />
              <Typography fontSize="0.9rem">{conditionDate}</Typography>
            </div>
          )
        }
      />
      {softwareName && (
        <CardContent>
          <Typography variant="caption">
            {t("software")}: {softwareName}
          </Typography>
        </CardContent>
      )}
      <ResourceCardActions resource={condition} />
    </Card>
  );
};

export default ConditionCard;
