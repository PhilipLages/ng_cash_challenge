import { FormEventHandler } from "react";

export interface AuthContextTypes {
  setAuthenticated: Function;
  handleLogin: FormEventHandler,
  login: {
    username: string,
    password: string,
  },
  setLogin: Function,
  errorMessage: string,
  setErrorMessage: Function,
  authenticated: boolean,
  user: {
    id: number,
    username: string
  },
  auth : {
    user: {
      id: number,
      username: string
    },
    token: string,
  },
  isAccountCreated: boolean,
  setIsAccountCreated: Function
};