import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passInput: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  handleEmailChange = ({ target: { value } }) => {
    this.setState({ emailInput: value });
  };

  handlePassChange = ({ target: { value } }) => {
    this.setState({ passInput: value });
  };

  render() {
    const {
      handlePassChange,
      handleEmailChange,
      state: { emailInput, passInput },
    } = this;
    const regex = /^\w+([.-]?\w+)+@\w+([.:]?\w+)+(\.[a-zA-Z0-9]{3})+$/;
    const passLength = 5;
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ handleEmailChange }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          onChange={ handlePassChange }
        />
        {regex.test(emailInput) && passInput.length > passLength ? (
          <button type="button">Entrar</button>
        ) : (
          <button type="button" disabled>
            Entrar
          </button>
        )}
      </div>
    );
  }
}

export default Login;
