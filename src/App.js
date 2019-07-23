import React, { useState, useCallback } from "react";
import { Route } from "react-router";

import Loading from "components/Loading";
import GlobalContext from "./contexts/GlobalContext";
import { loadAuth } from "./utils/auth";
import routes from "./routes";

import "./app.css";

function removeScheduleItem(schedule, scheduleItem) {
  return schedule.filter(item => item.parentName !== scheduleItem.parentName);
}

function App() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(() => loadAuth());
  const [schedules, setSchedules] = useState([]);

  const removeSchedule = useCallback(
    scheduleItem => {
      const nextSchedule = removeScheduleItem(schedules, scheduleItem);
      setSchedules(nextSchedule);
    },
    [schedules]
  );

  const addSchedule = useCallback(
    scheduleItem => {
      const nextSchedule = removeScheduleItem(schedules, scheduleItem);
      setSchedules([...nextSchedule, scheduleItem]);
    },
    [schedules]
  );

  return (
    <GlobalContext.Provider
      value={{
        schedules,
        auth,
        setAuth,
        removeSchedule,
        addSchedule,
        setLoading
      }}
    >
      <Loading visible={loading} />
      {routes.map(route => (
        <Route key={route.name} {...route} />
      ))}
    </GlobalContext.Provider>
  );
}

export default App;
