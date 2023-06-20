const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room_id: {
    type: String,
    required: true
  },
  message_id: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
