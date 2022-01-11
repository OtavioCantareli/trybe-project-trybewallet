import React from 'react';
import Expenses from './components/Expenses';
import Header from './components/Header';
import Table from './components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Expenses />
        <Table />
      </>
    );
  }
}

export default Wallet;
