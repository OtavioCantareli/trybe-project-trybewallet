import React from 'react';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export default class Expenses extends React.Component {
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
    const { results } = this.state;
    return (
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
                  <option data-testid={ `${result}` } key={ results[result].code }>
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
    );
  }
}
