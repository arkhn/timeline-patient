import React from "react";

import type { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

import PatientSearchBar from "features/patients/PatientSearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
}));

const Home = (): JSX.Element => {
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
      <PatientSearchBar onChange={handlePatientSelect} />
    </Container>
  );
};

export default Home;
