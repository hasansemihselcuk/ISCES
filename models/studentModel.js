const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  studentNumber: {
    type: String,
    trim: true,
  },
  iztechMail: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: "Department",
  },
  isApplied: {
    type: Boolean,
    default: false,
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hashSync(this.password, 12);
  next();
});

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
