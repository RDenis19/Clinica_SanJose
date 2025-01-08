import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import '../../styles/components/searchBar.css';

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar-container">
      <AiOutlineSearch className="search-icon" />
      <input
        type="text"
        className="search-bar"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
