import { EMAIL } from '../actions';

const initialState = {
  email: '',
};

const reducerLogin = (state = initialState, { type, payload }) => {
  switch (type) {
  case EMAIL:
    return {
      ...state,
      email: payload,
    };

  default:
    return state;
  }
};

export default reducerLogin;
