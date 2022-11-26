import { TransactionsTableTypes } from "../interfaces/TransactionsTableTypes";
import { format } from 'date-fns';
import './styles/table.css';

function TransactionsTable({ id, transactions, filterByType }: TransactionsTableTypes) {

  const formatDate = (date: string) => {
    const formatedDate = format(new Date(date), 'dd/MM/yyyy');

    return formatedDate;
  };

  return (
    <section className="table-container">
      <h2 className="table-title">Suas transações</h2>
      <div className='transactions-table'>
        <table className="">
          <thead>
            <tr>
              <th>Valor (R$)</th>
              <th>Data</th>
              <th>Tipo</th>
              <th>Usuário</th>
            </tr>
          </thead>
          <tbody>
            { transactions.filter(filterByType)
              .map(({ id: transacId, debitedAccountId, value, createdAt, debited, credited }) => (
              <tr key={ Number(transacId) }>
                <td>{ value }</td>
                <td>{ formatDate(createdAt) }</td>
                <td>{ debitedAccountId === id ? 'Cash Out' : 'Cash In' }</td>
                { debited ? (
                  <td>{ debited.user.username }</td>
                ) : (
                  <td>{ credited.user.username }</td>
                ) }
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TransactionsTable;