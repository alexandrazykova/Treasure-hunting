import  {useState} from 'react'
import { useMutation } from '@apollo/client';
import {ADD_PRODUCT} from '../../utils/mutations';

const ProductForm =({profileId}) =>{

    const [ProductInput, setProductInput] =useState({
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
  //call the addProduct mutation with the provided variable
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
  <form onSubmit={handleSubmit}>
    <div>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={ProductInput.name}
        onChange={handleChange}
      />
    </div>
    <div>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={ProductInput.price}
        onChange={handleChange}
      />
    </div>
    <div>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={ProductInput.description}
        onChange={handleChange}
      />
    </div>
    <div>
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={ProductInput.imageUrl}
        onChange={handleChange}
      />
    </div>
    <button type="submit">Add Product</button>
  </form>
);
};

export default ProductForm;
  