import { ChangeEvent, useState } from 'react';
import { CreateTransactionsTypes } from '../interfaces/CreateTransactionsTypes';
import './styles/createTransactions.css';

function CreateTransactions(props: CreateTransactionsTypes) {
  const {  
    balance, 
    transaction, 
    handleSubmit, 
    setNewTransaction, 
    errorMessage,
    setErrorMessage,
  } = props;

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setNewTransaction((prev: object) => ( { ...prev, [name]: value }));
    setErrorMessage('');
  };

  return (
    <section className='create-transaction-container'>
      <h1 className='balance'>
        { `Saldo: R$${ balance }` }
      </h1>
      <h2 className='new-transaction-title'
        >
        Nova Transação
      </h2>

        <div className='inputs-container'>
          <span className='error'>{ errorMessage ? errorMessage : '' }</span>
          <form onSubmit={ handleSubmit } className='form form-container'>
            <input 
              className='input is-small is-link is-rounded'
              type="text" 
              name="username" 
              placeholder='usuário' 
              value={ transaction.username }
              onChange={ handleChange }
            />
            <input
              className='input is-small is-link is-rounded'
              type="number" 
              name="value" 
              placeholder='valor' 
              value={ transaction.value }
              onChange={ handleChange }
            />
            <button className=' transaction-btn' type="submit">
              Enviar
            </button>
          </form>
        </div>

    </section>
  )
};

export default CreateTransactions;