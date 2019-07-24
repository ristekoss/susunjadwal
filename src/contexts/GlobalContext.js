import React, { useReducer } from "react";
import { loadAuth } from "utils/auth";

export const GlobalContext = React.createContext();

const initialState = {
  auth: loadAuth(),
  loading: false,
  schedules: []
};

function reducer(state, action) {
  switch (action.type) {
    case "setAuth":
      return { ...state, auth: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "addSchedule":
      return {
        ...state,
        schedules: [
          ...state.schedules.filter(
            item => item.parentName !== action.payload.parentName
          ),
          action.payload
        ]
      };
    case "removeSchedule":
      return {
        ...state,
        schedules: state.schedules.filter(
          item => item.parentName !== action.payload.parentName
        )
      };
    default:
      throw new Error();
  }
}

export default function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log({ provider: "provider", state });
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
