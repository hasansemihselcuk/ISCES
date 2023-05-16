const mongoose = require("mongoose");
const Faculty = require("./facultyModel");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  faculty: {
    type: mongoose.Schema.ObjectId,
    ref: "Faculty",
    required: [true, "Department must belong to a faculty"]
  },
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
