import { createSelector } from 'reselect';// selectLocationState expects a plain JS object for the routing state

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

/**
 * Direct selector to the buildSchedule state domain
 */
const selectGlobalDomain = () => (state) => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BuildSchedule
 */

const selectGlobal = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.toJS()
);

export default selectGlobal;
export {
  selectLocationState,
  selectBuildScheduleDomain,
};

