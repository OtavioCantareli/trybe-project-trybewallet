import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <input type="email" data-testid="email-input" placeholder="Email" />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
        />
        <button type="button" disabled>Entrar</button>
      </div>
    );
  }
}

export default Login;
