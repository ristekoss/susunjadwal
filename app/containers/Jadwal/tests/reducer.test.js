import expect from 'expect';
import jadwalReducer from '../reducer';
import { fromJS } from 'immutable';

describe('jadwalReducer', () => {
  it('returns the initial state', () => {
    expect(jadwalReducer(undefined, {})).toEqual(fromJS({}));
  });
});
