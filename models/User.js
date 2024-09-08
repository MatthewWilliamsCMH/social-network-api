const { Schema, model } = require('mongoose');

//structure the userSchema, which will be used to create the User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email."
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Thought' //this format references documents in another collection vs. embedding subdocuments.
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'User' //again, a reference to another collection (in this case, itself; it's self-reference)
            }
        ]
    },
//allow virtuals (custom, imperistent data [usually created by manipulating other data, like creating a full name or counting something]) so that we can add the friendCount method to the model
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//write the function that will generate the friendCount virtual data; this function has a getter, but it does not need a setter (I don't think it does, anyway)
userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

//define User to be built on the  'user' is the STRING that mongoose will pluralize to create a collection (table) in the mongodb. The actual variable that I will use in my code is "User." userSchema just tells mongoose what schema to use to structure the collection (in other words, what data each document in the collection may have)
const User = model('User', userSchema);

//make the User variable and it's definition available so I can create instances of User in other js files
module.exports = User;