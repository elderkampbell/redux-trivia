import { EMAIL, NOME, GRAVATAR } from '../actions/index';

const initialState = {
  email: '',
  nome: '',
  gravatar: '',
};

const reducerLogin = (state = initialState, { type, payload }) => {
  switch (type) {
  case EMAIL:
    return {
      ...state,
      email: payload,
    };
  case NOME:
    return {
      ...state,
      nome: payload,
    };
  case GRAVATAR:
    return {
      ...state,
      gravatar: payload,
    };

  default:
    return state;
  }
};

export default reducerLogin;
