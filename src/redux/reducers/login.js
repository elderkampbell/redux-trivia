import { EMAIL, REQUEST_API, GET_TOKEN } from '../actions';

const initialState = {
  email: '',
  token: '',
  loading: false,
};

const reducerLogin = (state = initialState, { type, payload }) => {
  switch (type) {
  case EMAIL:
    return {
      ...state,
      email: payload,
    };
  case REQUEST_API:
    return {
      ...state,
      loading: true,
    };
  case GET_TOKEN:
    return {
      ...state,
      loading: false,
      token: payload,
    };
  default:
    return state;
  }
};

export default reducerLogin;
