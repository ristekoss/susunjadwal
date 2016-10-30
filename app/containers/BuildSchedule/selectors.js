import { createSelector } from 'reselect';

/**
 * Direct selector to the buildSchedule state domain
 */
const selectBuildScheduleDomain = () => (state) => state.get('buildSchedule');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BuildSchedule
 */

const selectBuildSchedule = () => createSelector(
  selectBuildScheduleDomain(),
  (substate) => substate.toJS()
);

export default selectBuildSchedule;
export {
  selectBuildScheduleDomain,
};
