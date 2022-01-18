// Peguei essa no repo do Max

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, dataExpenses, api } from '../../actions/index';

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  onChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  async submit(event) {
    event.preventDefault();
    const { id, value, currency, method, tag, description } = this.state;
    const { dataExpense } = this.props;
    const exchangeRates = await api();
    const expenseDetails = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    this.setState((prev) => ({ id: prev.id + 1 }));
    dataExpense(expenseDetails);
    this.setState({
      value: '',
      description: '',
    });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    const { onChange, submit } = this;
    return (
      <form>
        <input
          id="value"
          name="value"
          type="number"
          value={ value }
          data-testid="value-input"
          onChange={ onChange }
        />
        <input
          id="description"
          name="description"
          type="text"
          data-testid="description-input"
          value={ description }
          onChange={ onChange }
        />
        <div>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ onChange }
            >
              {currencies.map((curr, index) => (
                <option value={ curr } key={ index } data-testid={ curr }>
                  {curr}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ onChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>
        <div>
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ onChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
        <button
          type="button"
          onClick={ submit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Expenses.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  dataExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  dataExpense: (expenses) => dispatch(dataExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
