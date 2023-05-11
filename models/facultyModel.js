const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
});

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;