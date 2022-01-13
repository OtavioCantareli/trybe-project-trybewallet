export const FILTER = 'FILTER';

const filterExpenses = (expenses) => ({
  type: FILTER,
  expenses,
});

export default filterExpenses;
