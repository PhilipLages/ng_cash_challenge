import { ChangeEvent } from 'react';
import { CreateTransactionsTypes } from '../interfaces/CreateTransactionsTypes';

function CreateTransactions({ balance, transaction, handleSubmit, setTransaction }: CreateTransactionsTypes) {

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setTransaction((prev: object) => ( { ...prev, [name]: value }));
  };

  return (
    <section className='create-transaction-container'>
      <h2>
        Nova Transação
      </h2>
      <p>
        { `Saldo: R$${ balance }` }
      </p>
      <form onSubmit={ handleSubmit }>
        <input 
          type="text" 
          name="username" 
          placeholder='usuário' 
          value={ transaction.username }
          onChange={ handleChange }
        />
        <input 
          type="number" 
          name="value" 
          placeholder='valor' 
          value={ transaction.value }
          onChange={ handleChange }
        />
        <button type="submit">
          Enviar
        </button>
      </form>
    </section>
  )
};

export default CreateTransactions;