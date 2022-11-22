import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services';
import './styles/signUpForm.css';

function SignUpForm() {
	const [login, setLogin] = useState({ username: '', password: '' });

	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
		setLogin((prev) => ( { ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		
		try {			
			const response = await createUser(login);

			window.alert(`Conta criada com sucesso! Olá, ${response.username}`);		
			navigate('/');
		} catch (error: any) {			
			setLogin({ username: '', password: '' })
			window.alert(error.response.data.message);
		};			
	};

	const passwordRegex = /^(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,}).{8,}$/;
	const isUsernameValid = login.username.length >= 3;
	const isPasswordLengthValid = login.password.length >= 8;
	const isPasswordValid = passwordRegex.test(login.password);

	const isDisable = isUsernameValid && isPasswordLengthValid && isPasswordValid;

  return (
		<form onSubmit={ handleSubmit } className='form'>
			<section className='signup-form'>
				<input 
					className='input'
					type="text" 
					name="username" 
					value={ login.username } 
					onChange={ handleChange }
					placeholder='Usuário'
				/>
				
				<div>
					<span 
						className={ isUsernameValid ? 'valid-field' : 'invalid-field' }
						>
						Pelo menos 3 caracteres
					</span>
				</div>

				<input 
					className='input'
					type="password" 
					name="password" 
					value={ login.password } 
					onChange={ handleChange }
					placeholder='Senha'
				/>	

				<div className='password-validation'>
					<p 
						className={ isPasswordLengthValid ? 'valid-field' : 'invalid-field' }
						>
						Pelo menos 8 caracteres
					</p>
					<p 
						className={ isPasswordValid ? 'valid-field' : 'invalid-field' }
						>
						Pelo menos 1 número e 1 letra maiúscula
					</p>
				</div>
			<button className='button is-link' type='submit' disabled={ !isDisable }>
				Criar conta
			</button>      
			</section>
		</form>
  );
};

export default SignUpForm;