import { ChangeEvent } from 'react';
import { TableFiltersTypes } from '../interfaces/TableFiltersTypes';
import './styles/filters.css';

function TableFilters({ filters, setFilters }: TableFiltersTypes) {

  const handleFiltersChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: object) => ({ ...prev, [name]: value }));
  };

  return (
    <section className='filters-container'>
      <h2 className='filters-title'>
        Filtrar transações
      </h2>
      <div className='control radio-container'>
        <label className='radio' htmlFor="cashIn">
          Cash In
          <input 
            type="radio" 
            name="type" 
            id="cashIn"
            value='cashIn'
            onChange={ handleFiltersChange }
          />
        </label>

        <label className='radio' htmlFor="cashOut">
          Cash Out
          <input 
            type="radio" 
            name="type" 
            id="cashOut" 
            value='cashOut'
            onChange={ handleFiltersChange }
          />
        </label>
      </div>

      <div className='data'>
      <label htmlFor="date">Data</label>      
      <input 
        type="date" 
        name="date" 
        id="date"
        value={ filters.date }
        onChange={ handleFiltersChange }
      />
      </div>
    </section>
  )
}

export default TableFilters;