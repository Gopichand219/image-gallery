import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const ImageSearch = ({ searchImages }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    searchImages(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="image-search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default ImageSearch;
