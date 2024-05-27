const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema de la persona
const PersonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Person', PersonSchema);
