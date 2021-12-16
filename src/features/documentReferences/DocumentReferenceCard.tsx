import React, { useMemo } from "react";

import type { IDocumentReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DateTime } from "luxon";
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

type DocumentReferenceCardProps = {
  documentReference: IDocumentReference;
};

const DocumentReferenceCard = ({
  documentReference,
}: DocumentReferenceCardProps): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { meta, date, resourceType } = documentReference;

  const softwareName = useMemo(
    () =>
      meta?.tag?.find(({ system }) => system === TERMINOLOGY_SYSTEM_URL)
        ?.display,
    [meta]
  );
  const documentReferenceDate = useMemo(
    () =>
      date &&
      DateTime.fromISO(date).toLocaleString(
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
        {
          locale: navigator.language,
        }
      ),
    [date]
  );
  return (
    <Card>
      <CardHeader
        disableTypography
        title={<DateInfo date={documentReferenceDate} />}
        subheader={
          <div className={classes.flexContainer}>
            {<Tag value={t(resourceType)} color="#555" />}
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
      <ResourceCardActions resource={documentReference} />
    </Card>
  );
};

export default DocumentReferenceCard;
