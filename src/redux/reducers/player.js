import { SAVE_POINTS, ASSERTIONS } from '../actions/index';

const initialState = {
  assertions: 0,
  score: 0,
};

const player = (state = initialState, { type, payload }) => {
  switch (type) {
  case SAVE_POINTS:
    return {
      ...state,
      score: payload,
    };
  case ASSERTIONS:
    return {
      ...state,
      assertions: payload,
    };
  default:
    return state;
  }
};

export default player;
