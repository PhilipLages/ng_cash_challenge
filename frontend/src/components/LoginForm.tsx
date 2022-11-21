import React, { useState } from 'react'
import axios from 'axios';
import { LoginFormTypes } from '../interfaces/LoginFormTypes';

function LoginForm() {
	const [login, setLogin] = useState({ username: '', password: '' });

	const handleChange = ({ target: { name, value } }) => {
		setLogin((prev) => ( { ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		const response = await axios({
			method: 'post',
			baseURL: 'http://localhost:3001',
			url: '/users/login',
			data: login
		});
		console.log(response);		
	};	

  return (
    <form onSubmit={ handleSubmit }>
      <section>
				<input 
					type="text" 
					name="username" 
					value={ login.username } 
					onChange={ handleChange }
					placeholder='Usuário'
				/>
				<input 
					type="password" 
					name="password" 
					value={ login.password } 
					onChange={ handleChange }
					placeholder='Senha'
				/>							
			</section>
      <button type='submit'>
        Entrar
      </button>      
    </form>
  )
}

export default LoginForm;