import { ChangeEvent, useState } from 'react';
import { TableFiltersTypes } from '../interfaces/TableFiltersTypes';
import './styles/filters.css';

function TableFilters({ filters, setFilters }: TableFiltersTypes) {
  const handleFiltersChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: object) => ({ ...prev, [name]: value }));
  };

  return (
    <section className='filters-container'>
      <h2 
        className='filters-title'
        >
        Filtrar transações
      </h2>

        <div className='filter-inputs'>
          <section className='radios'>
          <div className='radio-container'>
            <label className='cash-filter' htmlFor="cashIn">Cash In </label>
              <input 
                type="radio" 
                name="type" 
                id="cashIn"
                value='cashIn'
                onChange={ handleFiltersChange }
              />
          </div>
  
          <div className='radio-container'>      
            <label className='cash-filter' htmlFor="cashOut">Cash Out</label>
              <input 
                type="radio" 
                name="type" 
                id="cashOut" 
                value='cashOut'
                onChange={ handleFiltersChange }
              />
          </div>
        </section>
  
        <div className='data-container'>
          <label className='data-title' htmlFor="date">Data</label>      
          <input 
            className='input is-normal'
            type="date" 
            name="date" 
            id="date"
            value={ filters.date }
            onChange={ handleFiltersChange }
          />
        </div>
        </div>

    </section>
  )
}

export default TableFilters;