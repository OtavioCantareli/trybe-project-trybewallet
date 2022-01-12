// Coloque aqui suas actions

export const SUBMIT = 'SUBMIT';

const saveUser = (email) => ({
  type: SUBMIT,
  email,
});

export default saveUser;
