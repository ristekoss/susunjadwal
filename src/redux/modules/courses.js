/**
 * optimize schedule lookup
 */

export const ADD_SCHEDULE = "ADD_SCHEDULE";
export const REMOVE_SCHEDULE = "REMOVE_SCHEDULE";
export const SET_COURSES = "SET_COURSES";

export default function reducer(state = {}, { type, payload }) {
  switch (type) {
    case SET_COURSES:
      const result = {};
      payload.forEach(course => {
        course.classes.forEach(class_ => {
          result[`${course.name}-${class_.name}`] = false;
        });
      });
      return result;
    case ADD_SCHEDULE:
      console.log({ payload });
      const nextState = { ...state };
      const activatedKey = `${payload.parentName}-${payload.name}`;
      Object.keys(state).forEach(key => {
        if (key.indexOf(payload.parentName) === 0) {
          nextState[key] = key === activatedKey;
        }
      });
      console.log({ nextState });
      return nextState;
    case REMOVE_SCHEDULE:
      const newState = { ...state };
      const removedKey = `${payload.parentName}-${payload.name}`;
      if (typeof newState[removedKey] === "boolean") {
        newState[removedKey] = false;
      }
      return newState;
    default:
      return state;
  }
}

export function setCourses(courses) {
  return { type: SET_COURSES, payload: courses };
}
