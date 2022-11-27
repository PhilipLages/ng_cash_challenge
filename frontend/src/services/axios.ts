import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',  
});

export default api;

export const createUser = async (data: object) => {
  const response = await api.post('/users/signup', data);

  return response.data;
};

export const getUserAccount = async (id: number) => {
  const response = await api.get(`/users/${id}`);

  return response.data;
};

export const createTransaction = async (id: number, data: object) => {
  const response = await api.post(`/users/${id}/transactions`, data);

  return response.data;  
};

export const getTransactionsById = async (id: number) => {
  const response = await api.get(`/users/${id}/transactions`);

  return response.data;
};