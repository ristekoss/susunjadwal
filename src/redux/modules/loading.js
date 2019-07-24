export const SET_LOADING = "SET_LOADING";

export default function reducer(state = false, { type, payload }) {
  switch (type) {
    case SET_LOADING:
      return payload;
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
