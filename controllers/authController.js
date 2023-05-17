const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const body = Object.keys(req.body)[0];
  const fixedResponse = body.replace(/'/g, '"');
  const parsedResponse = JSON.parse(fixedResponse);
  const { email, password } = parsedResponse;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const student = await Student.findOne({ iztechMail: email }).select(
    "+password"
  );
  const correct = await user.correctPassword(password, user.password);
  if (!user || !correct) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = signToken(student._id);
  return res.status(200).json({
    status: "success",
    token,
    sid: student._id,
    name: student.name,
    surname: student.surname,
    studentNumber: student.studentNumber,
    department: student.department,
    iztechMail: student.iztechMail,
    isCandidate: student.isCandidate,
  });
});



exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await Student.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  req.user = currentUser;
  next();
});
