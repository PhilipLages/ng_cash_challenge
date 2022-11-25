import React, { createContext, PropsWithChildren, useState } from 'react';
import api from '../services/axios';

export const AuthContext = createContext({});

function AuthProvider({ children }: PropsWithChildren) {
	const [login, setLogin] = useState({ username: '', password: '' });
  const [user, setUser] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);


  const handleLogin = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		try {
			const { data } = await api.post('/users/login', login);
      
      setUser(data.user);
      api.defaults.headers.common['Authorization'] = `Basic ${ data.token }`;

      setAuthenticated(true);			
		} catch (error: any) {
      const { message } = error.response.data;

			setLogin({ username: '', password: '' });
			setErrorMessage(message);			
		}
	};	

  const context = {
    setAuthenticated,
    handleLogin,
    login,
    setLogin,
    errorMessage,
    setErrorMessage,
    authenticated,
    user,
    isAccountCreated,
    setIsAccountCreated
  };

  return (
    <AuthContext.Provider value={ context }>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;