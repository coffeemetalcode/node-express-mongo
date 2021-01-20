const mongoose = require('mongoose');

const Post = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Post', Post);