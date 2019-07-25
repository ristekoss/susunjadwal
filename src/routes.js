import React from "react";

import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
import HomePage from "./containers/HomePage";
import BuildSchedule from "./containers/BuildSchedule";
import Header from "./containers/Header";

function Routes() {
  return (
    <React.Fragment>
      <Route path="/" name="home" component={HomePage} exact />
      <Route component={RoutesWithNavbar} />
    </React.Fragment>
  );
}

const PRIVATE_ROUTES = [
  { path: "/susun", component: BuildSchedule },
  { path: "/jadwal/:scheduleId", component: BuildSchedule }
];

function RoutesWithNavbar() {
  return (
    <div>
      <Header />
      {PRIVATE_ROUTES.map(route => (
        <PrivateRoute key={route.path} {...route} />
      ))}
    </div>
  );
}
function PrivateRoute({ component: Component, ...rest }) {
  const auth = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
export default Routes;
