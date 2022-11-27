import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import TableFilters from '../components/TableFilters';
import TransactionsTable from '../components/TransactionsTable';
import { AuthContext } from '../context/AuthProvider';
import { AuthContextTypes } from '../interfaces/AuthContextTypes';
import { TransactionTypes } from '../interfaces/TransactionTypes';
import { createTransaction, getTransactionsById, getUserAccount } from '../services/axios';
import './styles/dashboard.css';
import CreateTransactions from '../components/CreateTransactions';

function Dashboard() {
  const [newTransaction, setNewTransaction] = useState({ username: '', value: 0 });
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: '', date: '' });
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const { authenticated } = useContext(AuthContext) as AuthContextTypes;

  useEffect(() => {
    if (!authenticated) {
      navigate('/');
    }

    try {
      const getAccountBalance = async () => {
        const response = await getUserAccount(Number(id));
        const transactions = await getTransactionsById(Number(id));
  
        const { userAccount: { balance } } = response;   
  
        setBalance(balance);
        setTransactions(transactions);
      };
  
      getAccountBalance();
    } catch (error: any) {
      const { message } = error.response.data;
      console.log(message);
    }
  }, []);

  const handleNewTransaction = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await createTransaction(Number(id), newTransaction);
      const account = await getUserAccount(Number(id));
      const transactions = await getTransactionsById(Number(id));
      const { userAccount: { balance } } = account;

      setBalance(balance);
      setTransactions(transactions);

      setNewTransaction({ username: '', value: 0 });
    } catch (error: any) {
      const { message } = error.response.data;

      setNewTransaction({ username: '', value: 0 });
      setErrorMessage(message);
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
      <Header/>
        <main className='dashboard-container'>
        <CreateTransactions  
          balance={ balance }
          transaction={ newTransaction }
          setNewTransaction={ setNewTransaction }
          handleSubmit={ handleNewTransaction }
          errorMessage={ errorMessage }
          setErrorMessage={ setErrorMessage }
        />       
        <TableFilters 
          filters={ filters }
          setFilters={ setFilters }
        />          
        <TransactionsTable 
          id={ Number(id) } 
          transactions={ filteredByDate }
          filterByType={ filterByType }
        />
      </main>
    </>
  )
}

export default Dashboard;