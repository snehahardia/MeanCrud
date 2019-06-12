const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
  title    : { type: String },
  description : { type: String }
});

module.exports = mongoose.model('list', listSchema, 'lists');