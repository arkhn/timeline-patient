import React from "react";

import { makeStyles } from "@mui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PUBLIC_URL } from "../../constants";
import PageNotFound from "./PageNotFound";

const useStyles = makeStyles((theme) => ({
  body: {
    paddingTop: theme.mixins.appbar.height,
    height: "100vh",
  },
}));

const Router = (): JSX.Element => {
  const classes = useStyles();
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <div className={classes.body}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
