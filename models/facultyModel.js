const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  departments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Department",
    },
  ],
});

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
