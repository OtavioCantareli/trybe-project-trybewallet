import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveExpenses from '../../actions/wallet';

const API_ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
      exchangeRates: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.saveResultToState = this.saveResultToState.bind(this);
  }

  componentDidMount() {
    this.saveResultToState();
  }

  onSubmit() {
    // event.preventDefault();
    const { saveExpense } = this.props;
    // console.log(allExpenses);
    this.setState((state) => ({ value: 0, id: state.id + 1 }));
    saveExpense(this.state);
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  async saveResultToState() {
    const results = await fetch(API_ENDPOINT)
      .then((response) => response.json())
      .catch((error) => error);
    this.setState({ exchangeRates: results });
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .catch((error) => error);
    return results;
  }

  render() {
    const { method, tag, currency, value, description, exchangeRates } = this.state;
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
              {Object.keys(exchangeRates).map((moeda) => (
                moeda !== 'USDT' && (
                  <option
                    data-testid={ moeda }
                    key={ moeda }
                    value={ moeda }
                  >
                    { moeda }
                  </option>
                )))}
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

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (state) => dispatch(saveExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
