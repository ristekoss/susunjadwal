import expect from 'expect';
import gabungJadwalReducer from '../reducer';
import { fromJS } from 'immutable';

describe('gabungJadwalReducer', () => {
  it('returns the initial state', () => {
    expect(gabungJadwalReducer(undefined, {})).toEqual(fromJS({}));
  });
});
