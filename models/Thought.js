const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // length
    },
  },
  {}
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
