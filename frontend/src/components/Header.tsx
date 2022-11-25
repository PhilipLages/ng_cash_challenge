import React, { useEffect, useState } from 'react'
import { Link, useNavigate,  } from 'react-router-dom';
import { HeaderTypes } from '../interfaces/HeaderTypes';
import logo from '../images/logo.jpg';
import './styles/header.css';
import { getUserAccount } from '../services/axios';

function Header({ id }: HeaderTypes) {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccount = async () => {
     try {
      const response = await getUserAccount(id);
      setUsername(response.username);
     } catch (error) {
      navigate('/');
     } 

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