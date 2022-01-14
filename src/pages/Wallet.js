import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Expenses from './components/Expenses';
// import Header from './components/Header';
// import Table from './components/Table';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      // <>
      //   <Header />
      //   <Expenses />
      //   <Table />
      // </>
      <header>
        <span data-testid="email-field">{ email }</span>
        <p data-testid="total-field">0</p>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
