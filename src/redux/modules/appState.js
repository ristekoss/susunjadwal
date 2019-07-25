import { ADD_SCHEDULE, REMOVE_SCHEDULE } from "./schedules";

export const SET_LOADING = "SET_LOADING";
export const SET_MOBILE = "SET_MOBILE";

export const initialState = {
  loading: false,
  isMobile: false,
  notifCount: 0
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_MOBILE:
      return { ...state, isMobile: payload };
    case ADD_SCHEDULE:
      return { ...state, notifCount: state.notifCount + 1 };
    case REMOVE_SCHEDULE:
      return { ...state, notifCount: state.notifCount - 1 };
    default:
      return state;
  }
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    payload: loading
  };
}

export function setMobile(isMobile) {
  return {
    type: SET_MOBILE,
    payload: isMobile
  };
}
