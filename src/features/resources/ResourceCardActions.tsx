import React, { useState } from "react";

import type { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardActions, CardContent, Collapse, Button } from "@mui/material";
import { DefaultTheme, makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

const useStyles = makeStyles<DefaultTheme, { isExpanded: boolean }>(
  (theme) => ({
    button: {
      textTransform: "none",
    },
    expandIcon: {
      transform: ({ isExpanded }) =>
        !isExpanded ? "rotate(0deg)" : "rotate(180deg)",
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
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles({ isExpanded });

  const handleExpandMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <CardActions disableSpacing>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={handleExpandMoreClick}
          data-testid={`expand-button-${resource.id}`}
          startIcon={<ExpandMoreIcon className={classes.expandIcon} />}
        >
          {t(!isExpanded ? "showFHIRResource" : "hideFHIRResource")}
        </Button>
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
