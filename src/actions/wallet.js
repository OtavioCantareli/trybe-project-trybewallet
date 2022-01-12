import { SUBMIT } from './index';

const saveExpenses = (expenses) => ({
  type: SUBMIT,
  expenses,
});

export default saveExpenses;
