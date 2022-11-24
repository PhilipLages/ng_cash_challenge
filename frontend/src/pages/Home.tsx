import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import ngcash from '../images/ngcash.jpg';
import './styles/home.css';

function Home() {
  return (
    <main className='container'>
      <img src={ ngcash } alt="NG.CASH" />
      <section className='login-container'>
          <LoginForm />
          <Link to={'/signup'}>
              Criar nova conta
          </Link>
      </section>
    </main>
  )
}

export default Home;