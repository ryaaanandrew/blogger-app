const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  content: String,
  creatorId: String,
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', PostSchema);
