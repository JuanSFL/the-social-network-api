const { Schema, model, Types } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // Regex that checks if user input is a valid email address.
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    //array of id's referencing the thought model
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
    },
    // array of 'friends' id's referencing the user model
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);
// virtual that gets the friendcount of the user
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  // creates User model using the UserSchema
  const User = model('User', userSchema);
  // export User model
  module.exports = User;
