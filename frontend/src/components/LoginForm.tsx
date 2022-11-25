import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { authLogin, loginUser } from '../services/axios';

function LoginForm() {
	const [login, setLogin] = useState({ username: '', password: '' });
	const [errorMessage, setErrorMessage] = useState('');
	// const [auth, setAuth] = useLocalStorage('auth', {});

	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
		setLogin((prev) => ( { ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		try {
			const response = await loginUser(login);
			authLogin(response.token);						
			
			navigate(`/${response.user.id}/dashboard`);
		} catch (error: any) {
			setLogin({ username: '', password: '' })
			setErrorMessage(error.response.data.message);			
		}
	};	

	const isUsernameValid = login.username.length > 0;
	const isPasswordValid = login.password.length > 0;
	const isDisable = isPasswordValid && isUsernameValid;

  return (
    <form onSubmit={ handleSubmit }>
      <section className='login-form'>
				{ errorMessage && <span>{ errorMessage }</span> }
				<input 
					className='input'
					type="text" 
					name="username" 
					value={ login.username } 
					onChange={ handleChange }
					placeholder='Usuário'
				/>
				<input 
					className='input'
					type="password" 
					name="password" 
					value={ login.password } 
					onChange={ handleChange }
					placeholder='Senha'
				/>							
      <button className='button is-link' type='submit' disabled={ !isDisable }>
        Entrar
      </button>      
			</section>
    </form>
  )
}

export default LoginForm;