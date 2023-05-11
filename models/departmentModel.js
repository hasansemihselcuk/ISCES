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
    },
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
