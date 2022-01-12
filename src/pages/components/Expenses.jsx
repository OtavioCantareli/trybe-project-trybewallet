import React from 'react';
import { connect } from 'react-redux';
import { saveExpenses } from '../../actions/index';

const API_ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.saveResultToState = this.saveResultToState.bind(this);
  }

  componentDidMount() {
    this.saveResultToState();
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  async saveResultToState() {
    const results = await fetch(API_ENDPOINT)
      .then((response) => response.json())
      .catch((error) => error);
    this.setState({ results });
    // return fetch(API_ENDPOINT)
    //   .then((response) => response.json())
    //   .catch((error) => error);
    return results;
  }

  render() {
    // const { results } = this.saveResultToState();
    // const saveResultToState = async () => {
    //   const results = fetch(API_ENDPOINT)
    //     .then((response) => response.json())
    //     .catch((error) => error);
    //   return results;
    // };
    const { onSubmit, onChange } = this;
    return (
      <form>
        <input
          name="value"
          type="number"
          data-testid="value-input"
          placeholder="Value"
          onChange={ onChange }
        />
        <input
          type="text"
          data-testid="description-input"
          placeholder="Description"
          onChange={ onChange }
          name="description"
        />
        <div>
          <label htmlFor="currency-input">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency-input"
              onChange={ onChange }
              name="currency"
            >
              {Object.keys(results)
                .filter((items) => items !== 'USDT')
                .map((result) => (
                  <option data-testid={ `${result}` } key={ results[result].code }>
                    {result}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div>
          <select
            data-testid="method-input"
            onChange={ onChange }
            defaultValue="Dinheiro"
            name="payment"
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
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
        <button name="btn" type="button" onClick={ onSubmit }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expenses: (state) => dispatch(saveExpenses(state)),
});

export default connect(null, mapDispatchToProps)(Expenses);
