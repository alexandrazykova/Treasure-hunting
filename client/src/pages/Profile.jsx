 import { useParams } from 'react-router-dom';
 import { useQuery } from '@apollo/client';

 import { QUERY_SINGLE_PROFILE } from '../utils/queries'; //need to confirm the path
 import ProductForm from '../components/ProductForm';
 const Profile = () => {
  const { profileId } = useParams();

   const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
   });

  const profile = data?.profile || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{profile.name} Products</h2>
      {profile.products?.length > 0 && (
        <div>
          {profile.products.map((product) => (
            <div key={product._id}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
      <div>
        <ProductForm profileId={profile._id} />
      </div>
    </div>
  );
};

export default Profile;
