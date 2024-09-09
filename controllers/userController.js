// const { User, Thought } = require('../models');
const { User } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v'); //added -__v here
            res.json(users);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //post a user
    async postUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json({message: 'The user was added.', user});
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //get a user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v'); //-__v ensures that the version field (automatically added by mongoose) is not returned
            if (!user) {
                return res.status(404).json({ message: 'The user was not found.' })
            }
            res.json(user);
        } 
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
  
    //put a user
    async putUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body}, //writes the data in req.body into the document returned in the request; fields that are not in req.body are left unchanged
                {runValidators: true, new: true} //new ensures that the data that's returned is the updated data, not the pre-update data; if false or omitted, the data before the update is executed is returned
            ).select('-__v'); //added -__v here
            res.json({message: 'The user was updated.', user});
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        };
    },

    //delete a user
    async deleteUser(req, res) {
        try {
            //try to get this working
            // const thought = await Thought.deleteMany({ users: req.params.userId });
            // if (!thought) {
            //     return res.status(404).json({ message: 'The user was deleted, but no thoughts were found.' });
            // };

            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'The user was not found.' });
            };
            // res.json({ message: 'The user and all associated thoughts were deleted.' });
            res.json({ message: 'The user was deleted.' });
        } 
        catch (err) {
          console.log(err);
          res.status(500).json(err);
        };
    },

    //add a friend
    async postFriend(req, res) {
        try {
            const { userId, friendId } = req.params; //extract userId and friendID from the http request (if I were pulling from the body of the request, it would be req.body)
            if (!userId || !friendId) {
                return res.status(404).json({message: 'The user, the friend, or both were not found.'})
            };
            const user = await User.findByIdAndUpdate( //update the user's friend array (note that we use POST even though we're updating a record instead of createing a new one)
                userId,
                { $addToSet: { friends: friendId } },
                { new: true }
            ).select('-__v'); //added -__v here
            if (!user) {
                return res.status(404).json({ message: 'The user was not found.' });
            }
            res.json({message: 'A friend was added.', user});
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
  },

    //delete a friend
    async deleteFriend(req, res) {
        try {
            const { userId, friendId } = req.params; 
            if (!userId || !friendId) {
                return res.status(404).json({message: 'The user, the friend, or both were not found.'})
            };
            const user = await User.findByIdAndUpdate( //note that we're not doing findByIdAndDelete because we're not deleting a user; we're updating a user's friends array
                userId,
                { $pull: {friends: friendId } },
                { new: true }
            ).select('-__v'); //added -__v here 
            if (!user) {
                return res.status(404).json({ message: 'The user was not found.' });
            }
            res.json({message: 'A friend was deleted.', user});
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};