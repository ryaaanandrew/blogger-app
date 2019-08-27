const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: String,
  postId: String,
  creatorId: String
});

module.exports = mongoose.model('Comment', CommentSchema);