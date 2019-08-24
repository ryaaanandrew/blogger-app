const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  content: String
});

module.exports = mongoose.model('Post', PostSchema);
