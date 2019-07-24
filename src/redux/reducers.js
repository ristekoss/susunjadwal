import { combineReducers } from "redux";

import auth from "./modules/auth";
import loading from "./modules/loading";
import schedules from "./modules/schedules";
import courses from "./modules/courses";

const rootReducer = combineReducers({
  auth,
  loading,
  schedules,
  courses
});

export default rootReducer;
