import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";

import Loading from "components/Loading";

import routes from "./routes";
import store from "./redux/store";

import "./app.css";

function App() {
  return (
    <Provider store={store}>
      {routes.map(route => (
        <Route key={route.name} {...route} />
      ))}
      <Loading />
    </Provider>
  );
}

export default App;
