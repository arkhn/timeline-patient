import React, { useState } from "react";

import type { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardActions, CardContent, Collapse, IconButton } from "@mui/material";
import { DefaultTheme, makeStyles } from "@mui/styles";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

const useStyles = makeStyles<DefaultTheme, { isExpanded: boolean }>(
  (theme) => ({
    expandButton: {
      transform: ({ isExpanded }) =>
        !isExpanded ? "rotate(0deg)" : "rotate(180deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
  })
);

type ResourceCardActionsType = {
  resource: IResourceList;
};

const ResourceCardActions = ({
  resource,
}: ResourceCardActionsType): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles({ isExpanded });

  const handleExpandMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <CardActions disableSpacing>
        <IconButton
          className={classes.expandButton}
          onClick={handleExpandMoreClick}
          data-testid={`expand-button-${resource.id}`}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={isExpanded} unmountOnExit>
        <CardContent>
          <SyntaxHighlighter
            data-testid={`expand-text-${resource.id}`}
            language="json"
            wrapLongLines
            style={monokai}
            showLineNumbers
          >
            {JSON.stringify(resource, null, 4)}
          </SyntaxHighlighter>
        </CardContent>
      </Collapse>
    </>
  );
};

export default ResourceCardActions;
