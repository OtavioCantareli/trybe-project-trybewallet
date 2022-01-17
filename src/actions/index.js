// Coloque aqui suas actions

export const USER_EMAIL = 'USER_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const login = (email) => ({ type: USER_EMAIL, email });

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const result = await api('https://economia.awesomeapi.com.br/json/all');
  const currencies = Object.keys(result).filter((currency) => currency !== 'USDT');

  dispatch(getCurrencies(currencies));
};

export const dataExpenses = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});
