import React, { useMemo } from "react";

import type { IEncounter } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

import DateInfo from "common/components/DateInfo";
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
}));

type EncounterCardProps = {
  encounter: IEncounter;
};

const EncounterCard = ({ encounter }: EncounterCardProps): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { meta, location, resourceType } = encounter;
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
        title={<DateInfo resource={encounter} />}
        subheader={
          <div className={classes.flexContainer}>
            <Tag value={resourceType} color="#555" />
            {locationName && <Tag value={locationName} color="#CCC" />}
          </div>
        }
      />
      {softwareName && (
        <CardContent>
          <Typography variant="caption">
            {t("software")}: {softwareName}
          </Typography>
        </CardContent>
      )}
      <ResourceCardActions resource={encounter} />
    </Card>
  );
};

export default EncounterCard;
