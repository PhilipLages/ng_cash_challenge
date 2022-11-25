import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { AuthContextTypes } from '../interfaces/AuthContextTypes';
import { useNavigate } from 'react-router-dom';
import './styles/loginForm.css';

function LoginForm() {
	const { 
		handleLogin, 
		login, 
		setLogin, 
		errorMessage, 
		authenticated,
		user,
	} = useContext(AuthContext) as AuthContextTypes;	

	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
		setLogin((prev: object) => ( { ...prev, [name]: value }));
	};

	useEffect(() => {
		if (authenticated) {
			navigate(`/${user.id}/dashboard`);
		}
	}, [authenticated]);
	
	const ValidateLogin = () => {
		const isUsernameValid = login.username.length > 0;
		const isPasswordValid = login.password.length > 0;
		const validate = isPasswordValid && isUsernameValid;

		return validate;
	};

	const isDisable = ValidateLogin();

  return (
    <form onSubmit={ handleLogin } className='form'>
			<span className='error-message'>{ errorMessage ? errorMessage : '' }</span>
      <section className='login-form'>
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
										
      <button 
				className='button login-btn' 
				type='submit' 
				disabled={ !isDisable }
				>
        Entrar
      </button>      
			</section>
    </form>
  )
}

export default LoginForm;