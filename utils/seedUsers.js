const mongoose = require('mongoose');
const { User } = require('./models');

const seedUsers = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/socialdb', { useNewUrlParser: true, useUnifiedTopology: true });

        //delete existing users to start fresh
        await Users.deleteMany({});

        //post users
        const users = await User.create([
            {
                username: 'matthew',
                email: 'matthew@gmail.com'
            },
            {
                username: 'mark',
                email: 'mark@gmail.com'
            },
            {
                username: 'matt',
                email: 'matt@gmail.com'
            },
            {
                username: 'kevin',
                email: 'kevin@gmail.com'
            },
            {
                username: 'jeff',
                email: 'jeff@gmail.com'
            },
            {
                username: 'jan',
                email: 'jan@gmail.com'
            },
            {
                username: 'diane',
                email: 'diane@gmail.com'
            },
            {
                username: 'theresa',
                email: 'theresa@gmail.com'
            }
        ]);
        console.log('Users was seeded.');
    } 
    catch (err) {
        console.error('Error seeding Users:', err);
    }
    finally {
        mongoose.connection.close();
    }
};

seedUsers();