import * as React from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";

import PatientTable from "components/patientTable";
import Patient from "components/patient";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={PatientTable} />
      <Route exact path="/patient/:id" component={({match: { params: { id } }}: any) => (<Patient patientId={id}/>)} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
