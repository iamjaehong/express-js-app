const { Schema } = require('mongoose');
const shortId = require('./types/short-id');

const PostSchema = new Schema({
  shortId,
  airport: {
    type: String,
    required: true,
  },
  area_apron: {
    type: Number,
  },
  capacity_apron: {
    type: String
  },
  area_parking: {
    type: Number
  },
  capacity_parking: {
    type: Number
  }

}, {
  timestamps: true,
});

module.exports = PostSchema;