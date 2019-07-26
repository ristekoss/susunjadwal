import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useSelector, useDispatch } from "react-redux";

import { getSchedule } from "services/api";
import { makeAtLeastMs } from "utils/promise";
import { setLoading } from "redux/modules/appState";

import Schedule from "./Schedule";

function ViewSchedule({ match }) {
  const dispatch = useDispatch();
  const isMobile = useSelector(state => state.appState.isMobile);

  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    async function fetchSchedule() {
      dispatch(setLoading(true));
      const {
        data: { user_schedule }
      } = await makeAtLeastMs(getSchedule(match.params.scheduleId), 1000);
      setSchedule(user_schedule);
      dispatch(setLoading(false));
    }
    fetchSchedule();
  }, [match, dispatch]);

  return (
    <React.Fragment>
      <Helmet
        title="Jadwal"
        meta={[{ name: "description", content: "Description of Jadwal" }]}
      />
      <Schedule
        width="100%"
        pxPerMinute={isMobile ? 0.7 : 0.9}
        schedule={schedule}
        startHour={8}
        endHour={21}
        showHeader
        showLabel
        showRoom
        mobile={isMobile}
      />
    </React.Fragment>
  );
}

export default ViewSchedule;
