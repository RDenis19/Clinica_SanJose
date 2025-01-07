import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import '../styles/components/searchBar.css';

const SearchBar = ({ placeholder, value, onChange }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <AiOutlineSearch className="icon" />
  </div>
);

export default SearchBar;
