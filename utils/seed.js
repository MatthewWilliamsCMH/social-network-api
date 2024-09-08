const mongoose = require('mongoose');
const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);
connection.once('open', async () => {
  console.log('connected');
    //delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

    async function seedDb() {
      try {
        //post users
        const users = await User.create([
          {username: 'matthew', email: 'matthew@gmail.com'},
          {username: 'mark', email: 'mark@gmail.com'},
          {username: 'matt', email: 'matt@gmail.com'},
          {username: 'kevin', email: 'kevin@gmail.com'},
          {username: 'jeff', email: 'jeff@gmail.com'},
          {username: 'jan', email: 'jan@gmail.com'},
          {username: 'diane', email: 'diane@gmail.com'},
          {username: 'theresa', email: 'theresa@gmail.com'}
        ]);
        console.log('Users was seeded.');
        
        //post thoughts
        const userIds = users.map(user => user._id);
        const thoughts = await Thought.create([
          {
            thoughtText: 'Here\'s a thought.',
            userId: userIds[0],
            createdAt: new Date(),
            reactions: [
              {
                reactionBody: 'Interesting thought!',
                userId: userIds[1]
              }
            ]
          },
          {
            thoughtText: 'The moon is blue!',
            userId: userIds[1],
            createdAt: new Date()
          },
          {
            thoughtText: 'I had too much ice scream today. I feel sick.',
            userId: userIds[2],
            createdAt: new Date(),
            reactions: [
              {
                reactionBody: 'There\'s no such thing as too much ice cream!',
                userId: userIds[3]
              },
              {
                reactionBody: 'Agreed. Ice cream is my love language.',
                userId: userIds[4]
              }
            ]
          },
          {
          thoughtText: 'We bought a new Debra Joyce Dawson painting today! That\'s four of hers in our collection. It\'s of a chorten in Bhutan that she and I both visited.',
            userId: userIds[4],
            createdAt: new Date(),
            reactions: [
              {
                reactionBody: 'Where is Bhutan?',
                userId: userIds[5]
                },
              {
                reactionBody: 'In Asia sandwiched between China, India, and Nepal.',
                userId: userIds[4]
              },
            ]
          },
          {
            thoughtText: 'Does anyone remember the \"Where\'s the beef?!\" commercials. I saw one on YouTube today. Still makes me laugh.',
            userId: userIds[6],
            createdAt: new Date(),
            reactions: [
              {
                reactionBody: 'That was Wendy\'s, right?',
                userId: userIds[7]
              }
            ]
          },
          {
            thoughtText: 'My dog is asleep on my feet. I love when he does that in the winter, but right now, it\'s just making me hot.',
            userId: userIds[7],
            createdAt: new Date(),
            reactions: [
              {
                reactionBody: 'What\'s your dog\'s name?',
                userId: userIds[3]
              },
              {
                reactionBody: 'Elvis',
                userId: userIds[7]
              }
            ]
          },
          {
            thoughtText: 'Do we have class tonight?',
            userId: userIds[6],
            createdAt: new Date(),
            reactions: [
              {
                reactionBody: 'No. It\'s a holiday. Yay!',
                userId: userIds[1]
              }
            ]
          },
          {
            thoughtText: 'Today is my dad\'s birthday!',
            userId: userIds[1],
            createdAt: new Date(),
            reactions: [
              {
                reactionBody: 'How old is he?',
                userId: userIds[0]
              },
              {
                reactionBody: '89',
                userId: userIds[1]
              },
              {
                reactionBody: 'Damn, man! You\'re old!',
                userId: userIds[7]
              }
            ]
          },
          {
            thoughtText: 'Off to my clay-throwing class.',
            userId: userIds[4],
            createdAt: new Date()
          },
          {
            thoughtText: 'This is my last post. I\'m giving up on social media.',
            userId: userIds[1],
            createdAt: new Date(),
            reactions: [
              {
                reactionBody: 'Don\'t the door hit ya where the good lord split ya.',
                userId: userIds[5]
              }
            ]
          },
        ]);
    
        console.log('Thoughts was seeded.');

        for (const user of users) {
          const userThoughts = thoughts.filter(thought => thought.userId.toString() === user._id.toString())
          await User.findByIdAndUpdate(
            user._id,
            { $addToSet: { thoughts: { $each: userThoughts.map(thought => thought._id) } } },
            { new: true }
          );
        }
      } 
      catch (err) {
        console.error('Error seeding the database:', err);
      }
      finally {
        mongoose.connection.close()
      }
  };
  seedDb();
});