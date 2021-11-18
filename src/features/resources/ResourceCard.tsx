import React, { useMemo } from "react";

import type { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useTranslation } from "react-i18next";

import Tag from "common/components/Tag";
import ConditionCard from "features/conditions/ConditionCard";
import EncounterCard from "features/encounters/EncounterCard";

type ResourceCardProps = {
  resource: IResourceList;
};

const ResourceCard = ({ resource }: ResourceCardProps): JSX.Element => {
  const { t } = useTranslation();
  const card: JSX.Element = useMemo(() => {
    switch (resource.resourceType) {
      case "Condition":
        return <ConditionCard condition={resource} />;
      case "Encounter":
        return <EncounterCard encounter={resource} />;

      default:
        return (
          <Card>
            <CardHeader
              title={<Tag value={t(resource.resourceType)} color="#555" />}
            />
            <CardContent>{JSON.stringify(resource)}</CardContent>
          </Card>
        );
    }
  }, [resource, t]);

  return card;
};

export default ResourceCard;
