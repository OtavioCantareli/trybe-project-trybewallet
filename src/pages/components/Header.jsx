import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'BRL',
      total: 0,
    };
  }

  render() {
    const { currency, total } = this.state;
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">{ email }</span>
        <p data-testid="total-field">{ total }</p>
        <span data-testid="header-currency-field">{ currency }</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
