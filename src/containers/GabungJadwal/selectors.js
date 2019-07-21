import { createSelector } from 'reselect';

/**
 * Direct selector to the gabungJadwal state domain
 */
const selectGabungJadwalDomain = () => (state) => state.get('gabungJadwal');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GabungJadwal
 */

const selectGabungJadwal = () => createSelector(
  selectGabungJadwalDomain(),
  (substate) => substate.toJS()
);

export default selectGabungJadwal;
export {
  selectGabungJadwalDomain,
};
