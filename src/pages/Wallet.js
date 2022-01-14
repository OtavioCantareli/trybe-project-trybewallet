import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Expenses from './components/Expenses';
// import Header from './components/Header';
// import Table from './components/Table';

const URL = 'https://economia.awesomeapi.com.br/json/all';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.saveResultToState();
  }

  async saveResultToState() {
    const results = await fetch(URL)
      .then((response) => response.json())
      .catch((error) => error);
    this.setState({ results });
  }

  render() {
    const { email } = this.props;
    const { results } = this.state;
    return (
      <>
        <header>
          <span data-testid="email-field">{email}</span>
          <p data-testid="total-field">0</p>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form>
          <input type="number" data-testid="value-input" placeholder="Value" />
          <input
            type="text"
            data-testid="description-input"
            placeholder="Description"
          />
          <div>
            <label htmlFor="currency-input">
              Moeda:
              <select data-testid="currency-input" id="currency-input">
                {Object.keys(results)
                  .filter((items) => items !== 'USDT')
                  .map((result) => (
                    <option
                      data-testid={ `${result}` }
                      key={ results[result].code }
                    >
                      {result}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div>
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </div>
          <div>
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </div>
          <button type="button">Adicionar despesa</button>
        </form>
      </>
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
