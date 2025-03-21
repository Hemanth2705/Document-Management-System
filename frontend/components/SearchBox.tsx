import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px; /* Ensure proper width */
  margin: 10px auto;
  padding: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  font-size: 16px;
  outline: none;
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const SearchBox: React.FC<{ onSearch: (term: string) => void }> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContainer onSubmit={(e) => { e.preventDefault(); onSearch(searchTerm); }}>
      <SearchInput
        type="text"
        placeholder="Search documents and folders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton type="submit">
        <FaSearch />
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBox;
