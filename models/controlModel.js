const mongoose = require("mongoose");

const controlSchema = new mongoose.Schema({
    isStarted: {
        type: Boolean,
        default: false,
    },
    isEnded: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

const Control = mongoose.model("Control", controlSchema);

module.exports = Control;