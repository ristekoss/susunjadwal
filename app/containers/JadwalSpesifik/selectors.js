import { createSelector } from 'reselect';

/**
 * Direct selector to the jadwalSpesifik state domain
 */
const selectJadwalSpesifikDomain = () => (state) => state.get('jadwalSpesifik');

/**
 * Other specific selectors
 */


/**
 * Default selector used by JadwalSpesifik
 */

const selectJadwalSpesifik = () => createSelector(
  selectJadwalSpesifikDomain(),
  (substate) => substate.toJS()
);

export default selectJadwalSpesifik;
export {
  selectJadwalSpesifikDomain,
};
