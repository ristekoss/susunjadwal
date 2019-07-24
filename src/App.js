import React, { useState, useCallback, useReducer } from "react";
import { Route } from "react-router";

import Loading from "components/Loading";
import GlobalStateProvider from "./contexts/GlobalContext";

import routes from "./routes";

import "./app.css";

function App() {
  console.log("root rerender");

  return (
    <GlobalStateProvider>
      {routes.map(route => (
        <Route key={route.name} {...route} />
      ))}
      <Loading />
    </GlobalStateProvider>
  );
}

export default App;
