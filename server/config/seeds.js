const db = require('./connection');
const { User, Product, Comment, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await cleanDB('Category', 'categories');
    await cleanDB('Product', 'products');
    await cleanDB('User', 'users');
  
    const categories = await Category.insertMany([
      { name: 'Household' },
      { name: 'Jewelry' },
      { name: 'Art' },
      { name: 'Clothes' },
      { name: 'Toys' }
    ]);

    console.log('categories seeded');

    const products = await Product.insertMany([
      {
        name: 'Tin of Cookies',
        description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        image: 'cookie-tin.jpg',
        category: categories[0]._id,
        price: 2.99,
        quantity: 500
      },
      {
        name: 'Canned Coffee',
        description:
          'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
        image: 'canned-coffee.jpg',
        category: categories[0]._id,
        price: 1.99,
        quantity: 500
      },
