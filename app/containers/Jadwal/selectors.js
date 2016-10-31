import { createSelector } from 'reselect';

/**
 * Direct selector to the jadwal state domain
 */
const selectJadwalDomain = () => (state) => state.get('jadwal');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Jadwal
 */

const selectJadwal = () => createSelector(
  selectJadwalDomain(),
  (substate) => substate.toJS()
);

export default selectJadwal;
export {
  selectJadwalDomain,
};
