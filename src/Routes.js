import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

import AppliedRoute from "./components/AppliedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import HealthCheck from "./containers/HealthCheck";
import EventUpsertWizard from "./containers/event/EventUpsertWizard.web";
import Settings from "./containers/Settings";

const testEndPoints = [{
  url: 'http://localhost:8080/potluck',
  resourceName: "one"
},
  {
    url: 'http://localhost:8080/login',
    resourceName: "two",
    mayReceiveWarnings: true
  },
  {
    url: 'http://localhost:8080/signup',
    resourceName: "three"
  }];


export default ({ childProps }) =>
  <Switch>
    <BrowserRouter>
      <AppliedRoute path="/" exact component={Home} props={childProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
      <AuthenticatedRoute path="/potluck" exact component={EventUpsertWizard} props={childProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} props={childProps} />
      <AuthenticatedRoute path="/health" exact component={HealthCheck} props={childProps} />
    </BrowserRouter>
  </Switch>;
