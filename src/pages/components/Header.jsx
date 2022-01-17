import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses
      .reduce((acc, val) => {
        acc
          += val.value * val.exchangeRates[val.currency].ask;
        return acc;
      }, 0)
      .toFixed(2);
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <p data-testid="total-field">{total}</p>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
