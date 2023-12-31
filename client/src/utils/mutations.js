import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;


export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

// export const ADD_COMMENT = gql`
//   mutation addComment($userId: ID!, $comment_text: String!) {
//     addComment(userId: $userId, comment_text: $comment_text) {
//       _id
//       comment_text
//       }
//     }
//   }
// `;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;
// using for saving product to the favourite list
export const SAVE_PRODUCT = gql`
  mutation saveProduct($productBody:ProductInput) {
    saveProduct (productBody:$productBody){
      _id
      email
      productCount
      savedProducts {
        _id
        name
        description
        image
        price
        category
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($profileId: ID!, $ProductInput: ProductInput) {
    addProduct(profileId: $profileId, productInput: $ProductInput) {
      _id
      name
      price
      description
      imageUrl
    }
  }
`;
// using to remove product from the favourite list
export const REMOVE_PRODUCT = gql`
  mutation removeProduct($Id:ID!) {
    removeProduct (Id:$Id){
      _id
      email
      productCount
      savedProducts {
        _id
        name
        description
        image
      }
    }
  }
`;

