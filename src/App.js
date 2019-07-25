import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";

import MediaQuery from "containers/MediaQuery";
import Loading from "containers/Loading";

import routes from "./routes";
import store from "./redux/store";

import "./app.css";

function App() {
  return (
    <Provider store={store}>
      {routes.map(route => (
        <Route key={route.name} {...route} />
      ))}
      <MediaQuery />
      <Loading />
    </Provider>
  );
}

export default App;
