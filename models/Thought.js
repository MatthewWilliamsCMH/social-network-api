const { Schema, model }= require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            trimmed: true,
            minLength: 1, //is the needed since the field is required?
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => {
                return createdAtValue.toLocaleDateString();
            }
        },
        username: {
            type: String, //I assume this is not going to be the user's name but his/her id. Yes?
            required: true
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;