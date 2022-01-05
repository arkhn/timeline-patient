import React, { useMemo } from "react";

import type { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Card, CardHeader } from "@mui/material";

import DateInfo from "common/components/DateInfo";
import Tag from "common/components/Tag";
import ConditionCard from "features/conditions/ConditionCard";
import DocumentReferenceCard from "features/documentReferences/DocumentReferenceCard";
import EncounterCard from "features/encounters/EncounterCard";

import ResourceCardActions from "./ResourceCardActions";

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
      case "DocumentReference":
        return <DocumentReferenceCard documentReference={resource} />;

      default:
        return (
          <Card>
            <CardHeader
              title={<DateInfo resource={resource} />}
              subheader={<Tag value={resource.resourceType} color="#555" />}
            />
            <ResourceCardActions resource={resource} />
          </Card>
        );
    }
  }, [resource]);

  return card;
};

export default ResourceCard;
