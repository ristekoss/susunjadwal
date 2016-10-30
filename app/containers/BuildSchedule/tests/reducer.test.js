import expect from 'expect';
import buildScheduleReducer from '../reducer';
import { fromJS } from 'immutable';

describe('buildScheduleReducer', () => {
  it('returns the initial state', () => {
    expect(buildScheduleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
