const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");
const catchAsync = require("./../utils/catchAsync");
const Election = require("../models/departmentElectionModel");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
/*
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
*/

// TAMAMEN ŞİFRELERİ HASHLI TUTABİLMEK İÇİN

exports.signup = catchAsync(async (req, res, next) => {
  const infos = req.body;
  const newStudent = await Student.create({
    name: infos.name,
    surname: infos.surname,
    studentNumber: infos.studentNumber,
    iztechMail: infos.iztechMail,
    password: infos.password,
    GPA: infos.GPA,
    year: infos.year,
    department: infos.department,
  });
  const token = signToken(newStudent._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newStudent,
    },
  });
});

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

  if (student) {
    const isPasswordCorrect = await student.correctPassword(
      password,
      student.password
    );
    if (isPasswordCorrect) {
      console.log(student);
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
    }
  }

  const admin = await Admin.findOne({ iztechMail: email }).select("+password");
  if (admin) {
    console.log(email, password);
    const isPasswordCorrect = await admin.correctPassword(
      password,
      admin.password
    );
    if (isPasswordCorrect) {
      const token = signToken(admin._id);

      return res.status(200).json({
        status: "success",
        token,
        aid: admin._id,
        name: admin.name,
        surname: admin.surname,
        email: admin.iztechMail,
        isAdmin: admin.isAdmin,
      });
    }
  }

  return next(new AppError("Incorrect email or password", 401));
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

  const currentUserStudent = await Student.findById(decoded.id);
  if (currentUserStudent) {
    req.user = currentUserStudent;
    return next();
  }

  const currentUserAdmin = await Admin.findById(decoded.id);
  if (currentUserAdmin) {
    req.user = currentUserAdmin;
    return next();
  }

  return next(
    new AppError("The user belonging to this token does no longer exist.", 401)
  );
});

exports.checkElectionStatus = catchAsync(async (req, res, next) => {
  const election = await Election.findOne({
    isStarted: true,
    isEnded: false,
  });
  if (!election) {
    return next(new AppError("Seçim henüz başlamadı veya bitti", 400));
  }
  next();
});

exports.checkElectionStatusForEndElection = catchAsync(
  async (req, res, next) => {
    const election = await Election.findOne({
      isStarted: true,
      isEnded: true,
    });
    if (!election) {
      return next(new AppError("Seçim henüz başlamadı", 400));
    }
    next();
  }
);
