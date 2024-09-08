// const { ObjectId } = require('mongoose').Types; //requires mongoose type object id, which we'll use in some of the functions. Needed?
const { User, Thought, reactionSchema } = require('../models');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //post a thought to a user
    async postThought(req, res) {
        try {
            const { thoughtText, userId } = req.body
            const thought = await Thought.create({ //this block creates the thought and assigns the username to it. Should it be assiging the userId?
                thoughtText,
                userId
            });
            console.log(thought)

            const user = await User.findByIdAndUpdate( //this block writes the thought into the thoughts array for the user at userId
                user,
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'The user was not found.' });
            };
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //get a thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v'); //-__v ensures that the version field (automatically added by mongoose) is not returned
            if (!thought) {
                return res.status(404).json({ message: 'The thought was not found.' });
            }
            res.json(thought);
        } 
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //put a thought
    async putThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            res.json(thought);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({message: 'The thought was not found.'});
            };
            res.json({message: 'The thought was deleted.'});
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //post reaction
    async postReaction(req, res) {
        console.log("hello")
    },

    //delete reaction
    async deleteReaction(req, res) {
        console.log("hello")

    }
};