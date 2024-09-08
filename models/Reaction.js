const { Schema } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User'
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => {
                return createdAtValue.toLocaleDateString();
            }
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

module.exports = reactionSchema;