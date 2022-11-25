import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import ngcash from '../images/ngcash.jpg';
import { AuthContextTypes } from '../interfaces/AuthContextTypes';
import './styles/home.css';

function Home() {

  const { isAccountCreated } = useContext(AuthContext) as AuthContextTypes;

  return (
    <main className='container'>
      <img src={ ngcash } alt="NG.CASH" className='image' />
      <h1 
        className='title'
        >O app da <span>N</span>ova <span>G</span>eração
      </h1>
      <section className='links-container'>
      { isAccountCreated && (
        <span>Conta criada com sucesso!</span>
      ) }
        <Link to={'/login'}>
          Faça login
        </Link>

        <Link to={'/signup'}>
          Criar nova conta
        </Link>
      </section>
    </main>
  )
}

export default Home;