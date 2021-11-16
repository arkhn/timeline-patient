import React, { useMemo } from "react";

import type { ICondition } from "@ahryman40k/ts-fhir-types/lib/R4";
import BackIcon from "@mui/icons-material/ArrowBack";
import { Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Timeline from "common/components/Timeline";
import ConditionCard from "features/conditions/ConditionCard";
import PatientInfo from "features/patients/PatientInfo";
import conditions from "mock/conditions.json";

const useStyles = makeStyles((theme) => ({
  patientInfoContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    height: theme.mixins.breadcrumbBar.height,
  },
  button: {
    textTransform: "none",
    position: "absolute",
  },
  timelineContainer: {
    height: `calc(100vh - ${theme.mixins.breadcrumbBar.height}px)`,
    minHeight: 500,
    overflow: "auto",
  },
}));

const Patient = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const patientConditions = useMemo(
    () =>
      conditions.sort(
        (
          { onsetDateTime: onsetDateTime1 },
          { onsetDateTime: onsetDateTime2 }
        ) =>
          DateTime.fromISO(onsetDateTime1) < DateTime.fromISO(onsetDateTime2)
            ? 1
            : -1
      ) as ICondition[],
    []
  );

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="xl">
      <Button
        onClick={handleBackClick}
        className={classes.button}
        variant="outlined"
        startIcon={<BackIcon />}
      >
        {t("back")}
      </Button>
      <Container>
        <div className={classes.patientInfoContainer}>
          <PatientInfo />
        </div>
        <div className={classes.timelineContainer}>
          <Timeline
            items={patientConditions.map((condition) => (
              <ConditionCard key={condition.id} condition={condition} />
            ))}
          />
        </div>
      </Container>
    </Container>
  );
};

export default Patient;
