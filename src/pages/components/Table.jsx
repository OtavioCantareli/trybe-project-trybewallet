import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Table extends React.Component {
  valueConverted = (tax, value) => {
    const taxRate = Number(tax);
    const valueRate = Number(value);
    const result = (taxRate * valueRate).toFixed(2);
    return result.toString();
  };

  currencyName = (name) => name.split('/')[0];

  currencyValue = (tax) => Number(tax).toFixed(2).toString();

  render() {
    const { expenses } = this.props;
    const { valueConverted, currencyName, currencyValue } = this;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0
              && expenses.map((expense, index) => (
                <tr key={ index }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{expense.value}</td>
                  <td>
                    {currencyName(expense.exchangeRates[expense.currency].name)}
                  </td>
                  <td>
                    {currencyValue(expense.exchangeRates[expense.currency].ask)}
                  </td>
                  <td>
                    {valueConverted(
                      expense.exchangeRates[expense.currency].ask,
                      expense.value,
                    )}
                  </td>
                  <td>Real</td>
                  <td>Editar/Excluir</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Table);
