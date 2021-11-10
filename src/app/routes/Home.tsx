import React from "react";

import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

import PatientSearchBar from "features/patients/PatientSearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
}));

const Home = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <PatientSearchBar />
    </Container>
  );
};

export default Home;
