const mongoose = require('mongoose');
const { User, Thought } = require('./models');

const seedThoughts = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/socialdb', { useNewUrlParser: true, useUnifiedTopology: true });

        //get all users ids
        const users = await User.find();
        const userIds = users.map(user._id);

        //delete existing thoughts to start fresh
        await Thoughts.deleteMany({});

        //post thoughts
        const thoughts = await Thought.create([
            {
                thoughtText: 'Here\'s a thought.',
                username: userIds[0],
                createdAt: new Date(),
                reactions: [
                    {
                        reactionBody: 'Interesting thought!',
                        username: userIds[1]
                    }
                ]
            },
            {
                thoughtText: 'The moon is blue!',
                username: userIds[1],
                createdAt: new Date(),
                reactions: []
            },
            {
                thoughtText: 'I had too much ice scream today. I feel sick.',
                username: userIds[2],
                createdAt: new Date(),
                reactions: [
                    {
                        reactionBody: 'There\'s no such thing as too much ice cream!',
                        username: userIds[3]
                    },
                    {
                        reactionBody: 'Agreed. Ice cream is my love language.',
                        username: userIds[4]
                    },
                ]
            },
            {
                thoughtText: 'We bought a new Debra Joyce Dawson painting today! That\'s four of hers in our collection. It\'s of a chorten in Bhutan that she and I both visited.',
                username: userIds[4],
                createdAt: new Date(),
                reactions: [
                    {
                        reactionBody: 'Where is Bhutan?',
                        username: userIds[5]
                    },
                    {
                        reactionBody: 'In Asia sandwiched between China, India, and Nepal.',
                        username: userIds[4]
                    },
                ]
            },
            {
                thoughtText: 'Does anyone remember the \"Where\'s the beef?!\" commercials. I saw one on YouTube today. Still makes me laugh.',
                username: userIds[6],
                createdAt: new Date(),
                reactions: [
                    {
                        reactionBody: 'That was Wendy\'s, right?',
                        username: userIds[7]
                    }
                ]
            },
            {
                thoughtText: 'My dog is asleep on my feet. I love when he does that in the winter, but right now, it\'s just making me hot.',
                username: userIds[7],
                createdAt: new Date(),
                reactions: [
                    {
                        reactionBody: 'What\'s your dog\'s name?',
                        username: userIds[8]
                    },
                    {
                        reactionBody: 'Elvis',
                        username: userIds[7]
                    }
                ]
            },
            {
                thoughtText: 'Do we have class tonight?',
                username: userIds[8],
                createdAt: new Date(),
                reactions: [
                    {
                        reactionBody: 'No. It\'s a holiday. Yay!',
                        username: userIds[6]
                    }
                ]
            },
            {
                thoughtText: 'Today is my dad\'s birthday!',
                username: userIds[3],
                createdAt: new Date(),
                reactions: [
                    {
                        reactionBody: 'How old is he?',
                        username: userIds[1]
                    },
                    {
                        reactionBody: '89',
                        username: userIds[3]
                    },
                    {
                        reactionBody: 'Damn, man! You\'re old!',
                        username: userIds[5]
                    }
                ]
            },
            {
                thoughtText: 'Off to my clay-throwing class.',
                username: userIds[4],
                createdAt: new Date(),
                reactions: []
            },
            {
                thoughtText: 'This is my last post. I\'m giving up on social media.',
                username: userIds[1],
                createdAt: new Date(),
                reactions: [
                    {
                        reactionBody: 'Don\'t the door hit ya where the good lord split ya.',
                        username: userIds[8]
                    }
                ]
            },
        ]);

        console.log('Thoughts was seeded.');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding the database:', err);
        mongoose.connection.close();
    }
};

seedThoughts();
