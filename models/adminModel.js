const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  iztechMail: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  password: {
    type: String,
    trim: true,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

adminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
