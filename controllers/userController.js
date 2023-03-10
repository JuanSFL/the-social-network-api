const { User, Thought } = require("../models");

module.exports = {
    //Gets all users
    getUsers(req, res) {
      User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    //Get single user
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .then((user) => {
          console.log(user)
          if (!user) {
            res.status(404).json({ message: "No User found with that ID!" });
          } else {
            res.status(200).json(user);
          }
        })
        .catch((err) => res.status(500).json(err));
    },
    //create a user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    //update a user
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "No User found with this ID!" });
          } else {
            res.json(user);
          }
        })
        .catch((err) => res.status(500).json(err));
    },
    //delete a user and their associated thoughts
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "No User found with this ID!" });
          } else {
            return Thought.deleteMany({ _id: { $in: user.thoughts } });
          }
        })
        .then(() => res.status(200).json({ message: "User and Thought deleted!" }))
        .catch((err) => res.status(500).json(err));
    },
    //adds a friend
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "No User found with this ID!" });
          } else {
            res.json(user);
          }
        })
        .catch((err) => res.status(500).json(err));
    },
    //delete a friend
    deleteFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "No User found with this ID!" });
          } else {
            res.json(user);
          }
        })
        .catch((err) => res.status(500).json(err));
    },
  };
  