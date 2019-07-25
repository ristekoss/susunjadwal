import React from "react";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router";
import { useSelector } from "react-redux";
import HomePage from "./containers/HomePage";
import BuildSchedule from "./containers/BuildSchedule";
import Header from "./containers/Header";
import ViewSchedule from "./containers/ViewSchedule";
import NotFoundPage from "./containers/NotFoundPage";

const ROUTES = [
  { path: "/susun", component: BuildSchedule, auth: true },
  { path: "/jadwal/:scheduleId", component: ViewSchedule, auth: false }
];

function Routes() {
  return (
    <React.Fragment>
      <Route path="/" name="home" component={HomePage} exact />
      <Route component={RoutesWithNavbar} />
    </React.Fragment>
  );
}

function RoutesWithNavbar() {
  return (
    <div>
      <Header />
      <ComponentWrapper>
        <Switch>
          {ROUTES.map(route => {
            const Component = route.auth ? PrivateRoute : Route;
            return <Component key={route.path} {...route} />;
          })}
          <Route component={NotFoundPage} />
        </Switch>
      </ComponentWrapper>
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
const ComponentWrapper = styled.div`
  padding-top: 64px;
`;
export default Routes;
