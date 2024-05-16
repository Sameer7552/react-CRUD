//search.js
import React, { useState } from 'react';

function Search({ onSearch, allItems }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm || null); // Pass null if the search term is empty
  };

  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={searchTerm}
      onChange={handleChange}
      className="px-4 py-2 rounded-md border w-full border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500"
    />
  );
}

export default Search;
