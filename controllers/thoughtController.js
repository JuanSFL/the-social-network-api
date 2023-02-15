const { User, Thought } = require("../models");
module.exports = {
    // Gets all thoughts
    getThoughts(req, res) {
      Thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // gets a single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => {
          if (!thought) {
            res.status(404).json({ message: "No thought found with this ID!" });
          } else {
            res.json(thought);
          }
        })
        .catch((err) => res.status(500).json(err));
    },
    //creates a thought and puts the created thought's id to the associated user's thoughts
    createThought(req, res) {
      Thought.create(req.body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then((thought) => {
          if (!thought) {
            res.status(404).json({ message: "No user found with this ID!" });
          } else {
            res.json(thought);
          }
        })
        .catch((err) => res.status(500).json(err));
    },
    //updates a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, New: true }
      )
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "No thought found with this ID!" });
          } else {
            res.json(user);
          }
        })
        .catch((err) => res.status(500).json(err));
    },
    //deletes a thought
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => {
          if (!thought) {
            res.status(404).json({ message: "No thought found with this ID!" });
          } else {
            return User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            );
          }
        })
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: 'Thought deleted, but no user found'});
          } else {
            res.json({ message: 'Thought successfully deleted' });
          }
        })
        .catch((err) => res.status(500).json(err));
    },
    //creates a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) => {
            if (!thought) {
              res.status(404).json({ message: "No thought found with ID!" });
            } else {
              res.json(thought);
            }
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      },
      //deletes a reaction
      deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) => {
            if (!thought) {
              res.status(404).json({ message: "No thought found with this ID!" });
            } else {
              res.json(thought);
            }
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      },
    }
      