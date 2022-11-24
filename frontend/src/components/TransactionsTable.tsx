import { TransactionsTableTypes } from "../interfaces/TransactionsTableTypes";
import { format } from 'date-fns';

function TransactionsTable({ id, transactions, filterByType }: TransactionsTableTypes) {

  const formatDate = (date: string) => {
    const formatedDate = format(new Date(date), 'dd/MM/yyyy');

    return formatedDate;
  };

  return (
    <section className="table-container">
      <table className="table is-bordered">
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
    </section>
  )
}

export default TransactionsTable;