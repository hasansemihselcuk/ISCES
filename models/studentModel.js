const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
//SONRA YAPILCAK
const multer = require("multer");

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
  GPA: {
    type: Number,
    trim: true,
    default: 2.0,
  },
  year: {
    type: Number,
    trim: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  image: {
    type: String,
    trim: true,
    default: "default.jpg",
  },
  isCandidate: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVotedForDepartment: {
    type: Boolean,
    default: false,
  },
  isVotedForFaculty: {
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
