// const { ObjectId } = require('mongoose').Types; //requires mongoose type object id, which we'll use in some of the functions. Needed?
const { User, Thought, reactionSchema } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
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
            res.json(user);
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
            );
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        };
    },

    //delete a user; BONUS: delete all their thoughts as well
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'The user was not found.' });
            };

            const thought = await Thought.deleteMany({ users: req.params.userId });
            if (!thought) {
                return res.status(404).json({ message: 'The user was deleted, but no thoughts were found.' });
            };
            res.json({ message: 'The user and all associated thoughts were deleted.' });
        } 
        catch (err) {
          console.log(err);
          res.status(500).json(err);
        };
    },

    //add a friend
    async postFriend(req, res) {
        console.log("hello")
    },

    //delete a friend
    async deleteFriend(req, res) {
        console.log("hello")
    }
};