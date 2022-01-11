// Esse reducer será responsável por tratar as informações da pessoa usuária

import { SUBMIT } from '../actions/index';

const INITIAL_USER_STATE = {
  email: '',
};

const user = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case SUBMIT:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;
