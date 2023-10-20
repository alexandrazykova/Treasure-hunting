
const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    category: Category
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
<<<<<<< HEAD
    orders: [Order]
  }
  
  type Order {
    _id: ID
    purchaseDate: String
=======
    password: String
>>>>>>> main
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

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    users: [User]
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth

    updateUser(firstName: String, lastName: String, email: String, password: String): User

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

