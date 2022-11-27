import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import ngcash from '../images/ngcash.jpg';
import './styles/loginPage.css';

function Login() {
  return (
    <main className='login-page'>
      <img src={ ngcash } alt="NG.CASH" className='image' />
      <Link to={'/'} className='back'>Voltar</Link>
      <h1 className='title'>Entre na sua conta</h1>
      <LoginForm />
    </main>
  )
}

export default Login