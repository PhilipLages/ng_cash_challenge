import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HeaderTypes } from '../interfaces/HeaderTypes';
import logo from '../images/logo.jpg';
import './styles/header.css';
import { getUserAccount } from '../services';

function Header({ id }: HeaderTypes) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await getUserAccount(id);

      setUsername(response.username);
    };

    fetchAccount();
  }, []);
  
  return (
    <header>
      <section className='header-container'>
      <img src={ logo } alt="NG.CASH" />
        <p>
          { `Olá, ${ username }! ` }
        </p>
        <Link to={'/'}>
          Logout
        </Link>
      </section>
    </header>
  )
}

export default Header;