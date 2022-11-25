import axios from 'axios';
import { LoginDataTypes } from '../interfaces/LoginDataTypes';

export default axios.create

export const createUser = async (data: object) => {
  const response = await axios({
    method: 'post',
    baseURL: 'http://localhost:3001',
    url: '/users/signup',
    data
  });

  return response.data
};

export const loginUser = async (data: LoginDataTypes) => {  
  const response = await axios({
    method: 'post',
    baseURL: 'http://localhost:3001',
    url: '/users/login',
    data
  });

  return response.data;
};

export const authLogin = (token: string) => {
    const response = axios.create({
    baseURL: 'http://localhost:3001',  
    headers: {
      'Authorization': `Basic ${token}`
    }
  });

  return response;
};

export const getUserAccount = async (id: number) => {
  const response = await axios({
    method: 'get',
    baseURL: 'http://localhost:3001',
    url: `/users/${id}`
  });

  return response.data;
};

export const createTransaction = async (id: number, data: object) => {
  const response = await axios({
    method: 'post',
    baseURL: 'http://localhost:3001',
    url: `/users/${id}/transactions`,
    data
  });

  return response.data;  
};

export const getTransactionsById = async (id: number) => {
  const response = await axios({
    method: 'get',
    baseURL: 'http://localhost:3001',
    url: `/users/${id}/transactions`
  });

  return response.data;
};