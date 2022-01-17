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
    this.expenseSubmit = this.expenseSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  async expenseSubmit(event) {
    event.preventDefault();
    const { id, value, currency, method, tag, description } = this.state;
    const { dataExpense } = this.props;
    const exchangeRates = await api();
    const expenseCard = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    this.setState((prev) => ({ id: prev.id + 1 }));
    dataExpense(expenseCard);
    this.setState({
      value: '',
      description: '',
    });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currenciesArr } = this.props;
    return (
      <form>
        <input
          id="value"
          name="value"
          type="number"
          value={ value }
          data-testid="value-input"
          onChange={ this.handleChange }
        />
        <input
          id="description"
          name="description"
          type="text"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChange }
        />
        <div>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currenciesArr.map((c, i) => (
                <option value={ c } key={ i } data-testid={ c }>
                  {c}
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
            onChange={ this.handleChange }
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
            onChange={ this.handleChange }
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
          onClick={ this.expenseSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Expenses.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currenciesArr: PropTypes.arrayOf(PropTypes.any).isRequired,
  dataExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currenciesArr: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  dataExpense: (expenses) => dispatch(dataExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
