const sequelize = require('../config/connection');
const User = require('../models/User.js');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
        {
            username: 'spidermanfan',
            password: 'password',
        },
        {
            username: 'chloeprice',
            password: 'password',
        },
        {
            username: 'monkeyball',
            password: 'password',
        },
        {
            username: 'iluvskiing',
            password: 'password',
        }], 
        {
            individualHooks: true,
            returning: true,
        }
    );
};

seedDatabase();