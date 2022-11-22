import axios from 'axios';

export const createUser = async (data: object) => {
  const response = await axios({
    method: 'post',
    baseURL: 'http://localhost:3001',
    url: '/users/signup',
    data
  });

  return response.data
};

export const loginUser = async (data: object) => {
  const response = await axios({
    method: 'post',
    baseURL: 'http://localhost:3001',
    url: '/users/login',
    data
  });

  return response.data;
};

export const getAccountBalance = async (id: any) => {
  const response = await axios({
    method: 'get',
    baseURL: 'http://localhost:3001',
    url: `/users/${id}`
  });

  return response.data;
};