import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';

const ProductForm = ({ profileId }) => {
  const [ProductInput, setProductInput] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
  });
  const [addProduct] = useMutation(ADD_PRODUCT);

  // Handle changes in the form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the ProductInput state with the new values
    setProductInput({ ...ProductInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the addProduct mutation with the provided variable
    addProduct({
      variables: { profileId, ProductInput },
    });
    // Reset the form fields after submission
    setProductInput({
      name: '',
      price: '',
      description: '',
      imageUrl: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputContainer}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={ProductInput.name}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainer}>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={ProductInput.price}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainer}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={ProductInput.description}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={inputContainer}>
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={ProductInput.imageUrl}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <button className="btn" type="submit" style={submitButtonStyle}>
        Add Product
      </button>
    </form>
  );
};

const formStyle = {
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f8f8f8',
};

const inputContainer = {
  marginBottom: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '3px',
};

const submitButtonStyle = {
  backgroundColor: '#e4d5f7',
  color: '#500202',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
};

export default ProductForm;
