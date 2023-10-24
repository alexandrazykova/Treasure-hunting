import { useState, useEffect } from 'react';

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (searchQuery) => {
    fetch(`/products/search?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
  };

  return (
    <div>
      <h2>Search for a Product</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Enter product name"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResults.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProducts;