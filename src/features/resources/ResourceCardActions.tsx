import React, { useMemo, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardActions, Collapse, Button, CardContent } from "@mui/material";
import { DefaultTheme, makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

import PDFDialogButton from "common/components/PDFDialogButton";
import type { DomainResourceList } from "models/types";

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
    syntaxHighlighter: {
      borderRadius: 8,
      fontSize: "0.8rem",
    },
    actionContainer: {
      gap: theme.spacing(2),
    },
  })
);

type ResourceCardActionsType = {
  resource: DomainResourceList;
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

  const pdfUrl = useMemo(() => {
    if (resource.resourceType === "DocumentReference") {
      return resource.content?.[0]?.attachment.url;
    }
  }, [resource]);

  return (
    <>
      <CardActions className={classes.actionContainer} disableSpacing>
        {pdfUrl && <PDFDialogButton file={pdfUrl} />}
        <Button
          variant="outlined"
          color="secondary"
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
            className={classes.syntaxHighlighter}
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
