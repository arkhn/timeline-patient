import React, { useMemo } from "react";

import type { IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import BackIcon from "@mui/icons-material/ArrowBack";
import { Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector } from "app/store";
import Timeline from "common/components/Timeline";
import PatientInfo from "features/patients/PatientInfo";
import ResourceFilterSelector from "features/resourceFilters/ResourceFilterSelector";
import { selectResourceFilters } from "features/resourceFilters/resourceFilterSlice";
import ResourceCard from "features/resources/ResourceCard";
import { sortResourcesByDate } from "features/resources/utils";
import { useApiPatientEverythingListQuery } from "services/api/api";

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
    }px - ${theme.spacing(7)})`,
    minHeight: 500,
    overflow: "auto",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(4),
  },
  leftContainer: { flex: 1, minWidth: 400 },
  rightContainer: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(2),
  },
}));

const Patient = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const filters = useAppSelector(selectResourceFilters);
  const { patientId } = useParams();

  const { data: resources } = useApiPatientEverythingListQuery(
    { patientId: patientId ?? "" },
    { skip: !patientId }
  );

  const patientResources = useMemo(
    () =>
      resources
        ? [...resources]
            .filter(({ resourceType }) => resourceType !== "Patient")
            .sort(sortResourcesByDate)
        : [],
    [resources]
  );

  const patientFiltersSet = useMemo(
    () => new Set(patientResources.map(({ resourceType }) => resourceType)),
    [patientResources]
  );
  const resourceCountDict = useMemo(
    () =>
      patientResources.reduce(
        (
          acc: Partial<Record<IResourceList["resourceType"], number>>,
          resource
        ) => ({
          ...acc,
          [resource.resourceType]: (acc[resource.resourceType] ?? 0) + 1,
        }),
        {}
      ),
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
        color="secondary"
      >
        {t("back")}
      </Button>
      <Container maxWidth="xl">
        <div className={classes.patientInfoContainer}>
          <PatientInfo />
        </div>
        <div className={classes.flexRow}>
          <div
            className={clsx(classes.timelineContainer, classes.leftContainer)}
          >
            <Timeline
              items={filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            />
          </div>
          <div className={classes.rightContainer}>
            <ResourceFilterSelector
              filters={patientFiltersSet}
              resourceCountDict={resourceCountDict}
            />
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Patient;
