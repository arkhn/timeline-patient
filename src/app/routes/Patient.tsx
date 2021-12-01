import React, { useMemo } from "react";

import type { ICondition, IEncounter } from "@ahryman40k/ts-fhir-types/lib/R4";
import BackIcon from "@mui/icons-material/ArrowBack";
import { Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "app/store";
import Timeline from "common/components/Timeline";
import ConditionCard from "features/conditions/ConditionCard";
import EncounterCard from "features/encounters/EncounterCard";
import PatientInfo from "features/patients/PatientInfo";
import ResourceFilterSelector from "features/resourceFilters/ResourceFilterSelector";
import { selectResourceFilters } from "features/resourceFilters/resourceFilterSlice";
import conditions from "mock/conditions.json";
import encounters from "mock/encounters.json";

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
    height: `calc(100vh - ${
      theme.mixins.breadcrumbBar.height
    }px - ${theme.spacing(3)})`,
    minHeight: 500,
    overflow: "auto",
  },
  flexRow: { display: "flex", flexDirection: "row" },
  leftContainer: { flex: 1 },
  rightContainer: {},
}));

const Patient = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const filters = useAppSelector(selectResourceFilters);

  const patientResources = useMemo(
    () =>
      [...(conditions as ICondition[]), ...(encounters as IEncounter[])].sort(
        (resource1, resource2) => {
          const date1 =
            resource1.resourceType === "Condition"
              ? DateTime.fromISO(resource1.onsetDateTime ?? "")
              : DateTime.fromISO(resource1.period?.start ?? "");
          const date2 =
            resource2.resourceType === "Condition"
              ? DateTime.fromISO(resource2.onsetDateTime ?? "")
              : DateTime.fromISO(resource2.period?.start ?? "");

          return date1 < date2 ? 1 : -1;
        }
      ),
    []
  );

  const patientFiltersSet = useMemo(
    () => new Set(patientResources.map(({ resourceType }) => resourceType)),
    [patientResources]
  );

  const filteredResources = useMemo(
    () =>
      patientResources.filter(
        (resource) => !filters.includes(resource.resourceType)
      ),
    [filters, patientResources]
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
        <div className={classes.flexRow}>
          <div
            className={clsx(classes.timelineContainer, classes.leftContainer)}
          >
            <Timeline
              items={filteredResources.map((resource) =>
                resource.resourceType === "Condition" ? (
                  <ConditionCard key={resource.id} condition={resource} />
                ) : (
                  <EncounterCard key={resource.id} encounter={resource} />
                )
              )}
            />
          </div>
          <div className={classes.rightContainer}>
            <ResourceFilterSelector filters={patientFiltersSet} />
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Patient;
