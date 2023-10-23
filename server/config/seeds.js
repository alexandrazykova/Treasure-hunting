const db = require('./connection');
const { User, Product, Comment, Category,Profile } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await cleanDB('Category', 'categories');
    await cleanDB('Product', 'products');
    await cleanDB('User', 'users');
    await cleanDB('Comment', 'comments');


    const categories = await Category.insertMany([
        { name: 'Household' },
        { name: 'Jewelry' },
        { name: 'Art' },
        { name: 'Clothes' },
        { name: 'Toys' }
    ]);

    console.log('categories seeded');

    const comments = await Comment.insertMany([
        { comment_text: 'Great one! Thank you for fast shipping' },
        { comment_text: 'Amazing quality, great variety of colours' },
        { comment_text: 'Will order again for sure' },
        { comment_text: 'Thank you very much. My friend loved the gift' },
        { comment_text: 'Very friendly seller. Amazing products too!' },
    ]);

    console.log('comments seeded');

    const products = await Product.insertMany([
        {
            name: 'Summer Dress',
            description:
                'Light and comfy summer dress with short sleeves, flower pattern and cotton fabric. Diffrent sizes and colour available',
            image: 'dress.png',
            category: categories[3]._id,
            price: 40,
            comment: comments[0]._id
        },
        {
            name: 'Custom Cotton Kitchen Towels',
            description:
                'Available in all colours and sizes. You can message me for special requests',
            image: 'towel.png',
            category: categories[0]._id,
            price: 19,
            comment: comments[1]._id
        },
        {
            name: 'Earrings',
            description:
                'Handmade hoops for any occasion. 2-6 inch. Titanium gold/silver. Custom designs also possible',
            image: 'earring.png',
            category: categories[1]._id,
            price: 26,
            comment: comments[2]._id
        },
        {
            name: 'Teddy Bear',
            description:
                'Handmade plush toy. Available in 10cm or 20cm sizes. Colours - white or brown. For custom requests please DM',
            image: 'bear.png',
            category: categories[4]._id,
            price: 15,
            comment: comments[3]._id
        },
        {
            name: 'Portraits',
            description:
                'Actor/singer/your loved once. Great idea for a gift. Price and time depending on the size. Please message me for more details',
            image: 'portrait.png',
            category: categories[2]._id,
            price: 72,
            comment: comments[4]._id
        }
    ]);

    console.log('products seeded');

    await User.create({
        firstName: 'Sarah',
        lastName: 'Naveed',
        email: 'sarah@testmail.com',
        password: 'password12345',
        orders: [
            {
                products: [products[0]._id, products[0]._id, products[1]._id]
            }
        ]
    });

    await User.create({
        firstName: 'Ariana',
        lastName: 'Vinamagua',
        email: 'ariana@testmail.com',
        password: 'password12345',
        orders: [
            {
                products: [products[1]._id, products[2]._id, products[3]._id]
            }
        ]
    });

    await User.create({
        firstName: 'Alexandra',
        lastName: 'Zykova',
        email: 'alexandra@testmail.com',
        password: 'password12345',
        orders: [
            {
                products: [products[4]._id]
            }
        ]
    });

    console.log('users seeded');

    process.exit();
});
