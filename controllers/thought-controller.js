const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
    .then(dbThought => res.json(dbThought))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({_id: params.id})
    .then(dbThought => res.json(dbThought))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  createThought({body}, res) {
    Thought.create(body)
    .then(({_id}) => {
      return User.findOneAndUpdate(
        {_id: body.userId},
        {$push: {thoughts: _id}},
        {new: true, runValidators: true}
      );
    })
    .then(dbUser => {
      console.log(dbUser);
      if (!dbUser) {
        res.status(404).json({message: "No user with that id!"});
      }
      res.json(dbUser);
    })
    .catch(err => res.json(err));
  },

  updateThought({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id},
      {thoughtText: body.thoughtText},
      {new: true})
      .then(dbThought => {
        if (!dbThought) {
          res.status(404).json({message: 'No thought found with this id!'});
          return;
        }
        res.json(dbThought);
      })
      .catch(err => res.json(err));
  },

  deleteThought({params}, res) {
    Thought.findOneAndDelete({_id: params.id})
    .then(deletedThought => {
      if (!deletedThought) {
        return res.status(404).json({message: 'No thought found with this id!'});
      }
      return User.findOneAndUpdate(
        {thoughts: {$elemMatch: {$eq: params.id}}},
        {$pull: {thoughts: params.id}},
        {new: true}
      );
    })
    .then(dbUser => {
      if (!dbUser) {
        res.status(404).json({message: "No user found with this id!"});
        return;
      }
      res.json(dbUser);
    })
    .catch(err => res.json(err));
  },

  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId},
      {$push: {reactions: body}},
      {new: true, runValidators: true}
    )
    .then(dbThought => {
      if (!dbThought) {
        res.status(404).json({message: 'No thought found with this id!'});
        return;
      }
      res.json(dbThought);
    })
    .catch(err => res.json(err));
  },

  deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId},
      {$pull: {reactions: {_id: params.reactionId}}},
      {new: true}
    )
    .then(dbThought => res.json(dbThought))
    .catch(err => res.json(err));
  }


};

module.exports = thoughtController;
