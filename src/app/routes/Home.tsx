import React from "react";

import type { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ArkhnLogo } from "assets/icons/arkhn-logo.svg";
import PatientSearchBar from "features/patients/PatientSearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  logo: {
    maxHeight: 40,
    width: "auto",
    "& > path": {
      fill: theme.palette.primary.main,
    },
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(5),
  },
}));

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const navigate = useNavigate();

  const handlePatientSelect = (
    _: React.SyntheticEvent<Element, Event>,
    patient: IPatient | null
  ) => {
    patient && navigate(`/${patient.id}`);
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <div className={classes.logoContainer}>
        <ArkhnLogo className={classes.logo} />
        <Typography
          fontFamily={"Quicksand"}
          color="primary"
          fontSize="1.7rem"
          fontWeight={"bold"}
        >
          {t("patientExplorer")}
        </Typography>
      </div>
      <PatientSearchBar onChange={handlePatientSelect} />
    </Container>
  );
};

export default Home;
