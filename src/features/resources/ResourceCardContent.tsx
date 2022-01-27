import React from "react";

import { CardContent } from "@mui/material";

import InnterHTMLDiv from "common/components/InnerHTMLDiv";
import type { DomainResourceList } from "models/types";

type ResourceCardContentProps = {
  resource: DomainResourceList;
};

const ResourceCardContent = ({
  resource,
}: ResourceCardContentProps): JSX.Element => {
  return (
    <>
      {resource.text?.div && (
        <CardContent>
          <InnterHTMLDiv innerHTML={resource.text.div} />
        </CardContent>
      )}
    </>
  );
};

export default ResourceCardContent;
