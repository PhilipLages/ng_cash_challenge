import { ChangeEvent } from 'react';
import { TableFiltersTypes } from '../interfaces/TableFiltersTypes';

function TableFilters({ filters, setFilters }: TableFiltersTypes) {

  const handleFiltersChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: object) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      <label htmlFor="cashIn">Cash In</label>
      <input 
        type="radio" 
        name="type" 
        id="cashIn"
        value='cashIn'
        onChange={ handleFiltersChange }
      />
      <label htmlFor="cashOut">Cash Out</label>
      <input 
        type="radio" 
        name="type" 
        id="cashOut" 
        value='cashOut'
        onChange={ handleFiltersChange }
      />

      <label htmlFor="date">Data</label>      
      <input 
        type="date" 
        name="date" 
        id="date"
        value={ filters.date }
        onChange={ handleFiltersChange }
      />
    </section>
  )
}

export default TableFilters