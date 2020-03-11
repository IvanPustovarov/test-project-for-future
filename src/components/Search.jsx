import React, { useState } from "react";
const Search = props => {
  const [searchTerm, setSearchTerm] = useState("");

  const disabled = props.isDisable;

  const onSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const onSearchSubmit = event => {
    setSearchTerm(searchTerm);
    props.searchCallback(searchTerm);
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSearchSubmit}>
        <input
          disabled={disabled}
          type="text"
          onChange={onSearchChange}
          value={searchTerm}
        />
        <button type="submit" disabled={disabled} onSubmit={onSearchSubmit}>
          Search
        </button>
      </form>
    </div>
  );
};
export default Search;
