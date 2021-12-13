const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: fmtDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      // TODO
    }
  },
  {}
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
