import * as React from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";

import Patients from "components/patients";
import Patient from "components/patient";

import { ROUTE_HOME, ROUTE_PATIENT } from "./constants";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTE_HOME} component={Patients} />
      <Route
        exact
        path={`${ROUTE_PATIENT}/:id`}
        component={({
          match: {
            params: { id }
          }
        }: any) => <Patient patientId={id} />}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
