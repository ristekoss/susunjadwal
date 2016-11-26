import expect from 'expect';
import jadwalSpesifikReducer from '../reducer';
import { fromJS } from 'immutable';

describe('jadwalSpesifikReducer', () => {
  it('returns the initial state', () => {
    expect(jadwalSpesifikReducer(undefined, {})).toEqual(fromJS({}));
  });
});
