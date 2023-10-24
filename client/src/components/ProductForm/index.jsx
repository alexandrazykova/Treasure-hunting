import  {useState} from 'react'
import { useMutation } from '@apollo/client';
import {ADD_PRODUCT} from './mutations';

const ProductForm =({profileId}) =>{

    const [sellerProductInput, setsellerProductInput] =useState({
        name: '',
        price: '',
        description: '',
        imageUrl: '',  
    });
    const [addProduct] = useMutation(ADD_PRODUCT);
 // Handle changes in the form input fields
 const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the sellerProductInput state with the new values
    setsellerProductInput({ ...sellerProductInput, [name]: value });
  };

  const handleSubmit = (e) => {
 e.preventDefault();
  //call the addProduct mutation with the provided variable
  addProduct({
    variables: { profileId, sellerProductInput },
  });
  // Reset the form fields after submission
  setsellerProductInput({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
  });
};

return (
  <form onSubmit={handleSubmit}>
    <div>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={sellerProductInput.name}
        onChange={handleChange}
      />
    </div>
    <div>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={sellerProductInput.price}
        onChange={handleChange}
      />
    </div>
    <div>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={sellerProductInput.description}
        onChange={handleChange}
      />
    </div>
    <div>
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={sellerProductInput.imageUrl}
        onChange={handleChange}
      />
    </div>
    <button type="submit">Add Product</button>
  </form>
);
};

export default ProductForm;
  