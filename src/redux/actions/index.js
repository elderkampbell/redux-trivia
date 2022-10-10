export const EMAIL = 'EMAIL';
export const NOME = 'NOME';
export const GRAVATAR = 'GRAVATAR';
export const REQUEST_API = 'REQUEST_API';
export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_GAME = 'SAVE_GAME';
export const SAVE_POINTS = 'SAVE_POINTS';
export const ASSERTIONS = 'assertions';

export const requestAPI = () => ({ type: REQUEST_API });

export const getToken = (payload) => ({ type: GET_TOKEN, payload });

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', (result.token));
    dispatch(getToken(result));
  } catch (e) {
    throw new Error(e);
  }
};

const action = (type, payload) => ({
  type,
  payload,
});

export default action;
