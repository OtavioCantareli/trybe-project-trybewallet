// Coloque aqui suas actions

export const SUBMIT = 'SUBMIT';

const saveUser = (email) => ({
  type: SUBMIT,
  email,
});

export const saveExpenses = (expenses) => ({
  type: SUBMIT,
  expenses,
});

export default saveUser;
