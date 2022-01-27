import React, { useMemo } from "react";

import type { ICondition } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

import DateInfo from "common/components/DateInfo";
import Tag from "common/components/Tag";
import ResourceCardActions from "features/resources/ResourceCardActions";
import { getResourceTagValues } from "features/resources/utils";
import { TERMINOLOGY_SYSTEM_URL } from "models/constants";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

type ConditionCardProps = {
  condition: ICondition;
};

const ConditionCard = ({ condition }: ConditionCardProps): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { code, meta, resourceType } = condition;
  const { tagValues, codeTitle } = useMemo(
    () => ({
      tagValues: getResourceTagValues(condition),
      codeTitle: code?.coding?.[0]?.display,
    }),
    [code, condition]
  );
  const softwareName = useMemo(
    () =>
      meta?.tag?.find(({ system }) => system === TERMINOLOGY_SYSTEM_URL)
        ?.display,
    [meta]
  );
  return (
    <Card>
      <CardHeader
        disableTypography
        title={<DateInfo resource={condition} />}
        subheader={
          <div className={classes.flexContainer}>
            {<Tag value={resourceType} color="#555" />}
            {tagValues.map((value, index) => (
              <Tag
                key={`tag_value_${condition.id}_${index}`}
                value={value}
                color="#CCC"
              />
            ))}
            {codeTitle && (
              <Typography display="inline" variant="h5">
                {codeTitle}
              </Typography>
            )}
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
      <ResourceCardActions resource={condition} />
    </Card>
  );
};

export default ConditionCard;
