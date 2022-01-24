import React, { useMemo, useState } from "react";

import { Button, Dialog } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useApiPatientsListQuery } from "services/api/api";

const useStyles = makeStyles(() => ({
  button: {
    textTransform: "none",
  },
  syntaxHighlighter: {
    borderRadius: 8,
    fontSize: "0.8rem",
    margin: "auto",
  },
}));

const PatientPayloadDialogButton = (): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const { patientId } = useParams();

  const { data: patient } = useApiPatientsListQuery(
    { id: patientId },
    {
      skip: !patientId,
      selectFromResult: (result) => ({ ...result, data: result.data?.[0] }),
    }
  );
  const patientPayload = useMemo(
    () => JSON.stringify(patient, null, 4),
    [patient]
  );

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      {patient && (
        <Button
          className={classes.button}
          onClick={handleButtonClick}
          variant="outlined"
          color="secondary"
        >
          {t("showPatientResource")}
        </Button>
      )}
      <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="lg">
        <SyntaxHighlighter
          data-testid={`patient-payload-${patient?.id}`}
          className={classes.syntaxHighlighter}
          language="json"
          wrapLongLines
          style={monokai}
          showLineNumbers
        >
          {patientPayload}
        </SyntaxHighlighter>
      </Dialog>
    </>
  );
};

export default PatientPayloadDialogButton;
