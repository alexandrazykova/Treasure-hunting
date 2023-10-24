import { useState } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import { REMOVE_PRODUCT } from '../utils/mutations'
import { QUERY_USER } from '../utils/queries';
import { removeProductId } from '../utils/localStorage';

const SavedProducts = () => {
  const [setUserData] = useState({});
  const { loading, data } = useQuery(QUERY_USER);
  const [removeProduct] = useMutation(REMOVE_PRODUCT);
  console.log(data)

 const handleDeleteProduct= async (productId) => {
  try {
    const { data: updatedUser } = await removeProduct({
      variables: { productId }
    });

    setUserData(updatedUser);

    removeProductId(productId);
  } catch (err) {
    console.error(err);
  }
};

//   // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Saved products:</h1>
        </Container>
      </div>
      {/* <Container>
        <h2 className='pt-5'>
          {data.user.savedProducts.length
            ? `Viewing ${data.user.savedProducts.length} saved ${data.user.savedProducts.length === 1 ? 'product' : 'products'}:`
            : 'You have no saved products!'}
        </h2>
        <Row>
          {data.user.savedProducts.map((product) => {
            return (
             
              <Col md="4">
                <Card key={product.productId} border='dark'>
                  {product.image ? <Card.Img src={product.image} alt={`The photo for ${product.name}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <p className='small'>{product.category}</p>
                    <Card.Text>{product.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteProduct(product.productId)}>
                      Delete this product!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              
            );
          })}
        </Row>
      </Container> */}
    </>
  );
};

export default SavedProducts;