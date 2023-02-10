const { Schema, model, Types} = require('mongoose');
const moment = require('moment')

const thoughtSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // getter to format time stamp on query
        get: timeStamp => moment(timeStamp).format("MMM DD, YYYY [at] hh:mm a"),
      },
      username: {
        type: String,
        required: true,
      },
      // array of nested documents created with reactionSchema.
      reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)
// virtual that gets the reaction count of the thought.
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

// creates thought model using thoughtSchema.
const Thought = model('Thought', thoughtSchema);
// export the Thought model
module.exports = Thought;