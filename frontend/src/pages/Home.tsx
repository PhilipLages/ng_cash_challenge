import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import './styles/home.css';

function Home() {
  return (
    <main className='container'>
      <img src="src/images/ngcash.jpg" alt="NG.CASH" />
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