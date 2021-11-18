import React, { useMemo } from "react";

import type { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Card, CardContent, CardHeader } from "@mui/material";

import ConditionCard from "features/conditions/ConditionCard";
import EncounterCard from "features/encounters/EncounterCard";

type ResourceCardProps = {
  resource: IResourceList;
};

const ResourceCard = ({ resource }: ResourceCardProps): JSX.Element => {
  const card: JSX.Element = useMemo(() => {
    switch (resource.resourceType) {
      case "Condition":
        return <ConditionCard condition={resource} />;
      case "Encounter":
        return <EncounterCard encounter={resource} />;

      default:
        return (
          <Card>
            <CardHeader title={resource.resourceType} />
            <CardContent>{JSON.stringify(resource)}</CardContent>
          </Card>
        );
    }
  }, [resource]);

  return card;
};

export default ResourceCard;
