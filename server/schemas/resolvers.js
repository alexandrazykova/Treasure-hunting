const { User, Product, Category, Order, Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
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
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category').populate('comment');
    },
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
    order: {
      resolve:async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });
  
        return user.orders.id(_id);
      }
  
      throw new AuthenticationError('Not logged in');
    },
  },
  
    getProfile: async (_, { _id }) => {
      try {
        const profile = await Profile.findById(_id);
        return profile;
      } catch (error) {
        throw new Error('Could not fetch the profile: ' + error.message);
      }
    },
  },

  Mutation: {
      checkout: {
  resolve:async (parent, args, context) => {
    const url = new URL(context.headers.referer).origin;

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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
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
//   saveProduct: async (parent, { productBody }, context) => {
//     if (context.user) {
//         const updatedUser = await User.findOneAndUpdate(
//             { _id: context.user._id },
//             { $push: { savedProducts: productBody } },
//             { new: true, runValidators: true }
//         );

//         return updatedUser;
//     }
//     throw AuthenticationError;
// },
// removeProduct: async (parent, { productId }, context) => {
//   if (context.user) {
//       const updatedUser = await User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $pull: { savedProducts: { productId } } },
//           { new: true }
//       );

  //     return updatedUser;
  // }
//   throw AuthenticationError;
// }
};

module.exports = resolvers;
