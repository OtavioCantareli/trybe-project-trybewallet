import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenses } from '../../actions/index';

const API_ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.saveResultToState = this.saveResultToState.bind(this);
  }

  componentDidMount() {
    this.saveResultToState();
  }

  onSubmit() {
    const { saveExpense } = this.props;
    // console.log(this.state);
    saveExpense(this.state);
    this.setState((state) => ({ value: 0, id: state.id + 1 }));
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  async saveResultToState() {
    const results = await fetch(API_ENDPOINT)
      .then((response) => response.json())
      .catch((error) => error);
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .catch((error) => error);
    return results;
  }

  render() {
    const { method, tag, currency, value, description } = this.state;
    const { onSubmit, onChange } = this;
    return (
      <form>
        <input
          name="value"
          type="number"
          data-testid="value-input"
          placeholder="Value"
          onChange={ onChange }
          value={ value }
        />
        <input
          type="text"
          data-testid="description-input"
          placeholder="Description"
          onChange={ onChange }
          name="description"
          value={ description }
        />
        <div>
          <label htmlFor="currency-input">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency-input"
              onChange={ onChange }
              name="currency"
              value={ currency }
            >
              <option data-testid="USD" value="USD">
                USD
              </option>
              <option data-testid="CAD" value="CAD">
                CAD
              </option>
              <option data-testid="EUR" value="EUR">
                EUR
              </option>
              <option data-testid="GBP" value="GBP">
                GBP
              </option>
              <option data-testid="ARS" value="ARS">
                ARS
              </option>
              <option data-testid="BTC" value="BTC">
                BTC
              </option>
              <option data-testid="LTC" value="LTC">
                LTC
              </option>
              <option data-testid="JPY" value="JPY">
                JPY
              </option>
              <option data-testid="CHF" value="CHF">
                CHF
              </option>
              <option data-testid="AUD" value="AUD">
                AUD
              </option>
              <option data-testid="CNY" value="CNY">
                CNY
              </option>
              <option data-testid="ILS" value="ILS">
                ILS
              </option>
              <option data-testid="ETH" value="ETH">
                ETH
              </option>
              <option data-testid="XRP" value="XRP">
                XRP
              </option>
            </select>
          </label>
        </div>
        <div>
          <select
            data-testid="method-input"
            onChange={ onChange }
            defaultValue="Dinheiro"
            name="method"
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>
        <div>
          <select
            data-testid="tag-input"
            onChange={ onChange }
            defaultValue="Alimentação"
            name="tag"
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
        <button name="btn" type="button" onClick={ () => onSubmit() }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Expenses.propTypes = {
  saveExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (val) => dispatch(saveExpenses(val)),
});

export default connect(null, mapDispatchToProps)(Expenses);
