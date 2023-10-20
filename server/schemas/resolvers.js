const { User, Product, Category, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // You need to find out the Stripe key setup process for this project.

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    // Resolver to search for products with filtering
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Product.find(params).populate('category');
    },
    // Resolver to search for product with id
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    users:async ()=>{
      return await User.find();
    },
    
    // Resolver to fetch user data with id
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
  
   // Resolvers to bring single order by _id with login
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    //Resolvers for checkout and payment
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;

    //   // Commented out the creation of the Order
       await Order.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = [];

      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`],
            },
            unit_amount: product.price * 100,
          },
        });
      }
    //   // Stripe session for payment
       const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         line_items,
         mode: 'payment',
         success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${url}/`,
      });

       return { session: session.id };
     },
  },
  // add a new user
  Mutation: {

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // add the order mutation
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },

    // Resolver for updating user details - requires authentication
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    // Commenting out the updateProduct quantity mutation
    // updateProduct: async (parent, { _id, quantity }) => {
    //   const decrement = Math.abs(quantity) * -1;
    //   return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    // },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
