import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getAccountBalance } from '../services';
import './styles/dashboard.css';

function Dashboard() {
  const [balance, setBalance] = useState(0);

  const params = useParams();

  useEffect(() => {
    const fetchAccount = async () => {
      const { id } = params;
      
      const response = await getAccountBalance(id);
      setBalance(response.balance);
    };

    fetchAccount();
  }, []);

  return (
    <>
      <Header/>
      <div>{`Saldo: R$${balance}`}</div>
    </>
  )
}

export default Dashboard;