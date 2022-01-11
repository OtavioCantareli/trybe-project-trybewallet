import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveUser from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => this.enableButton());
  };

  enableButton = () => {
    const { email, pass } = this.state;
    const regex = /^\w+([.-]?\w+)+@\w+([.:]?\w+)+(\.[a-zA-Z0-9]{3})+$/;
    const passLength = 6;
    if (pass.length >= passLength && regex.test(email)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { history, saveEmail } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    saveEmail(email);
  };

  render() {
    const {
      handleChange,
      onSubmit,
      state: { email, pass, isDisabled },
    } = this;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          name="email"
          onChange={ handleChange }
          defaultValue={ email }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          name="pass"
          onChange={ handleChange }
          defaultValue={ pass }
        />
        <input
          type="submit"
          value="Entrar"
          onClick={ onSubmit }
          disabled={ isDisabled }
        />
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
