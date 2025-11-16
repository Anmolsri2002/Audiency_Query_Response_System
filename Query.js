const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  channel: String,
  sender: String,
  subject: String,
  message: String,
  tags: [String],
  priority: { type: String, default: 'medium' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status: { type: String, default: 'new' },

  // NEW FIELD: Threaded replies (like Gmail)
  replies: [
    {
      text: String,
      by: String,
      at: { type: Date, default: Date.now }
    }
  ],

  history: [{ action: String, by: String, at: Date }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  reply: {
    message: String,
    repliedAt: Date,
    repliedBy: String
  },
  folder: {
    type: String,
    enum: ["inbox", "sent"],
    default: "inbox"
  }

});

module.exports = mongoose.model('Query', QuerySchema);
