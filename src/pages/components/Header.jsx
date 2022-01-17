import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <p data-testid="total-field">
          {total
            .reduce((acc, val) => val.value * val.exchangeRates[val.currency].ask,
            // return acc;
              0)
            .toFixed(2)}
        </p>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
