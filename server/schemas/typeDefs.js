
const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type Comment {
    _id: ID
    comment_text: String
  } 

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    category: Category
    comment: Comment
  }
  type Profile {
    user(_id: ID!): User
    name: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    productCount: Int
    savedProducts: [Product]
  }
  
  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }
  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductInput {
    _id: ID
    name: String
    image: String
    price: Float
  }

  input SearchInput {
    _id: ID
    name: String
    description: String
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    getProfile(_id: ID!): Profile
  }
  type Mutation {
    checkout(products: [ProductInput]): Checkout
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addProduct(profileId: ID!, productInput: ProductInput): Product
    saveProduct(productBody: SearchInput): User
    removeProduct(_Id: ID!): User
  }
`;

module.exports = typeDefs;


 
 
