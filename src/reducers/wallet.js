// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SUBMIT } from '../actions/index';
import { FILTER } from '../actions/expenses';

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case SUBMIT:
    return {
      expenses: [...state.expenses],
    };
  case FILTER:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
