import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateTransactions from '../components/CreateTransactions';
import Header from '../components/Header';
import TableFilters from '../components/TableFilters';
import TransactionsTable from '../components/TransactionsTable';
import { TransactionTypes } from '../interfaces/TransactionTypes';
import { createTransaction, getTransactionsById, getUserAccount } from '../services/axios';
import './styles/dashboard.css';

function Dashboard() {
  const [transaction, setTransaction] = useState({ username: '', value: 0 });
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: '', date: ''} );

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const getAccountBalance = async () => {
      const response = await getUserAccount(Number(id));
      const transactions = await getTransactionsById(Number(id));
      const { userAccount: { balance } } = response;

      setBalance(balance);
      setTransactions(transactions);
    };

    getAccountBalance();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await createTransaction(Number(id), transaction);
      const account = await getUserAccount(Number(id));
      const transactions = await getTransactionsById(Number(id));
      const { userAccount: { balance } } = account;

      setTransaction(transaction);
      setBalance(balance);
      setTransactions(transactions);
    } catch (error: any) {
      console.log(error.response.data.message);      
    }
  };

  const filteredByDate = transactions.filter((transaction: TransactionTypes) =>{
    return transaction.createdAt.includes(filters.date);
  });
 
  const filterByType = ((transaction: TransactionTypes) => {
    if (filters.type && filters.type === 'cashOut') {
      return transaction.debitedAccountId === Number(id);
    }
    if (filters.type && filters.type === 'cashIn') {
      return transaction.creditedAccountId === Number(id);
    }

    return transaction;
  });
  
  return (
    <>
      <Header id={ Number(id) } />
      <main>
        <section>
          <CreateTransactions  
            balance={ balance }
            transaction={ transaction }
            setTransaction={ setTransaction }
            handleSubmit={ handleSubmit }
          />
        </section>
        <section>
          <h2>Filtrar por</h2>
          <TableFilters 
            filters={ filters }
            setFilters={ setFilters }
          />
          <h2>Transações</h2>
          <TransactionsTable 
            id={ Number(id) } 
            transactions={ filteredByDate }
            filterByType={ filterByType }
          />
        </section>
      </main>
    </>
  )
}

export default Dashboard;