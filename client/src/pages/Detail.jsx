import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_ONE_PRODUCT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
//import '../index.css';

// import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  //const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_ONE_PRODUCT, {
    // pass URL parameter
    variables: { id },
  });

  const { cart } = state;

  const currentProduct = data ? data.product : {};


  // const { products, cart } = state;

  // useEffect(() => {
  //   // already in global store
  //   if (products.length) {
  //     setCurrentProduct(products.find((product) => product._id === id));
  //   }
  //   // retrieved from server
  //   else if (data) {
  //     dispatch({
  //       type: UPDATE_PRODUCTS,
  //       products: data.products,
  //     });

  //     data.products.forEach((product) => {
  //       idbPromise('products', 'put', product);
  //     });
  //   }
  //   // get cache from idb
  //   else if (!loading) {
  //     idbPromise('products', 'get').then((indexedProducts) => {
  //       dispatch({
  //         type: UPDATE_PRODUCTS,
  //         products: indexedProducts,
  //       });
  //     });
  //   }
  // }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };
  console.log("Current Product:", currentProduct);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-4">
          <div class="row">
    <div class="col-md-6">
      <Link to="/" className="mt-4 d-block">← Back to Products</Link>
              <img
                src={`/images/${currentProduct.image}`}
                alt={currentProduct.name}
                className="w-100"
              />
            </div>
            <div class="col-md-6">
      <h2>{currentProduct.name}</h2>
      <p className="mb-3">{currentProduct.description}</p>
      <p className="mb-2">
        <strong>Price:</strong> <span className="h3">${currentProduct.price}</span>
      </p>
      <button className="btn btn-primary me-2 m-1" onClick={addToCart}>Add to Cart</button>
      <button
        className="btn btn-danger m-1"
        disabled={!cart.find((p) => p._id === currentProduct._id)}
        onClick={removeFromCart}
      >
        Remove from Cart
      </button>
      <button className='btn m-1 '>Favorite ⭐ </button>
    </div>
          </div>

          <div className="row my-5">
            <div className="col-12">
              <h2>Comments</h2>
              <list>{currentProduct.comment.comment_text}</list>
            </div>
          </div>


        </div>
      ) : null}
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
      <Cart />
    </>
  );
}

export default Detail;
