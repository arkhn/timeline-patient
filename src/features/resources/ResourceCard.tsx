import React, { useMemo } from "react";

import { Card, CardHeader } from "@mui/material";
import { makeStyles } from "@mui/styles";

import DateInfo from "common/components/DateInfo";
import Tag from "common/components/Tag";
import ConditionCard from "features/conditions/ConditionCard";
import DocumentReferenceCard from "features/documentReferences/DocumentReferenceCard";
import EncounterCard from "features/encounters/EncounterCard";
import type { DomainResourceList } from "models/types";

import ResourceCardActions from "./ResourceCardActions";
import { getResourceTagValues } from "./utils";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

type ResourceCardProps = {
  resource: DomainResourceList;
};

const ResourceCard = ({ resource }: ResourceCardProps): JSX.Element => {
  const classes = useStyles();
  const card: JSX.Element = useMemo(() => {
    switch (resource.resourceType) {
      case "Condition":
        return <ConditionCard condition={resource} />;
      case "Encounter":
        return <EncounterCard encounter={resource} />;
      case "DocumentReference":
        return <DocumentReferenceCard documentReference={resource} />;

      default:
        return (
          <Card>
            <CardHeader
              title={<DateInfo resource={resource} />}
              subheader={
                <div className={classes.flexContainer}>
                  <Tag value={resource.resourceType} color="#555" />
                  {getResourceTagValues(resource).map((tagValue, index) => (
                    <Tag
                      key={`tag_value_${resource.id}_${index}`}
                      color="#CCC"
                      value={tagValue}
                    />
                  ))}
                </div>
              }
            />
            <ResourceCardActions resource={resource} />
          </Card>
        );
    }
  }, [classes.flexContainer, resource]);

  return card;
};

export default ResourceCard;
