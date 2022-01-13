// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SUBMIT } from '../actions/index';

const INITIAL_WALLET_STATE = {
  // currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case SUBMIT:
    console.log(state);
    return {
      // currencies: [...state.currencies],
      expenses: [...state.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
