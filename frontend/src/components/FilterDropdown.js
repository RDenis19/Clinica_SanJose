import React from 'react';
import { AiOutlineFilter } from 'react-icons/ai';
import '../styles/components/filterDropdown.css';

const FilterDropdown = ({ isOpen, toggle, filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="filter-dropdown">
      <button className="filter-button" onClick={toggle}>
        <AiOutlineFilter className="filter-icon" />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <label htmlFor="attention-filter">Tipo de Atención:</label>
            <select
              id="attention-filter"
              value={filters.attention || ''}
              onChange={(e) => handleChange('attention', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Consulta Externa">Consulta Externa</option>
              <option value="Hospitalización">Hospitalización</option>
            </select>
          </div>
          <div className="dropdown-item">
            <label htmlFor="status-filter">Estado:</label>
            <select
              id="status-filter"
              value={filters.status || ''}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
