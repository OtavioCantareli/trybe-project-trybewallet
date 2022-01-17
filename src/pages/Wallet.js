import React from 'react';
import Expenses from './components/Expenses';
import Header from './components/Header';
import Table from './components/Table';

export default class Wallet extends React.Component {
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
