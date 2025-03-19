import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBoxProps {
  onSearch: (term: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(searchTerm); }}>
      <input
        type="text"
        placeholder="Search documents and folders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;
