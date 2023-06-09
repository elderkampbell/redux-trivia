import {
  EMAIL, NOME,
  GRAVATAR,
  REQUEST_API,
  GET_TOKEN,
  SAVE_GAME } from '../actions/index';

const initialState = {
  email: '',
  token: '',
  loading: false,
  nome: '',
  gravatar: '',
  game: [],
};

const login = (state = initialState, { type, payload }) => {
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
  case REQUEST_API:
    return {
      ...state,
      loading: true,
    };
  case GET_TOKEN:
    return {
      ...state,
      loading: false,
      token: payload.token,
    };
  case SAVE_GAME:
    return {
      ...state,
      game: payload,
    };
  default:
    return state;
  }
};

export default login;
