const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
