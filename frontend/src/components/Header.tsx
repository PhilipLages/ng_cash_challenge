import { PropsWithChildren, useContext } from 'react'
import { Link  } from 'react-router-dom';
import logo from '../images/logo.jpg';
import './styles/header.css';
import { AuthContext } from '../context/AuthProvider';
import { AuthContextTypes } from '../interfaces/AuthContextTypes';

function Header() { 
  const { 
    user: { username }, 
    setLogin, 
    setAuthenticated,
    setErrorMessage,
  } = useContext(AuthContext) as AuthContextTypes;

  const handleLogout = () => {
    setAuthenticated(false);
    setLogin({ username: '', password: '' });
    setErrorMessage('');   
  };

  return (
    <header>
      <section className='header-container'>
      <img src={ logo } alt="NG.CASH" />
        <p className='username'>
          { `Olá, ${ username }! ` }
        </p>
        <Link to={'/'} onClick={ handleLogout }>
          Logout
        </Link>
      </section>
    </header>
  )
}

export default Header;