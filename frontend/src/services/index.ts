import axios from 'axios';

type dataTypes = {
  username: string,
  password: string,
};

export const createUser = async (data: object) => {
  const response = await axios({
    method: 'post',
    baseURL: 'http://localhost:3001',
    url: '/users/signup',
    data
  });

  return response.data
};

export const loginUser = async (data: dataTypes) => {
  const response = await axios({
    method: 'post',
    baseURL: 'http://localhost:3001',
    url: '/users/login',
    auth: data
  });

  return response.data;
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