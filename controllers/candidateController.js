const Student = require("../models/studentModel");
const Candidate = require("../models/departmentCandidateModel");
const Notification = require("../models/notificationModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.nomineeApplication = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { isNominee: true },
    { new: true, runValidators: true }
  );
  if (student.GPA < 2.75 || student.year < 2) {
    student.isNominee = false;
    return next(new AppError("Başvuru için GPA yetersiz.", 400));
  }
  const existingNominee = await Candidate.findOne({
    studentInfos: student._id,
  });
  if (existingNominee) {
    return next(new AppError("Öğrenci zaten aday olarak eklenmiş.", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.nomineeRejection = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { isNominee: false },
    { new: true, runValidators: true }
  );

  const newNotification = new Notification({
    message: "Adaylık başvurunuz reddedildi",
    to: student._id,
  });

  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.candidateApplication = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { isCandidate: true },
    { isNominee: false },
    { new: true, runValidators: true }
  );
  if (student.GPA < 2.75 || student.year < 2) {
    student.isCandidate = false;
    return next(new AppError("Başvuru için GPA yetersiz.", 400));
  }
  const existingCandidate = await Candidate.findOne({
    studentInfos: student._id,
  });

  if (existingCandidate) {
    return next(new AppError("Öğrenci zaten aday olarak eklenmiş.", 400));
  }
  const newCandidate = new Candidate({
    studentInfos: student._id,
  });

  const newNotification = new Notification({
    message: "Adaylık başvurunuz kabul edildi",
    to: student._id,
  });

  await newCandidate.save();
  res.status(200).json({
    status: "success",
    data: {
      newCandidate,
    },
  });
});

exports.cancelCandidateApplication = catchAsync(async (req, res, next) => {
  const candidate = req.params.id;
  let departmentCandidate = await Candidate.findOne({
    studentInfos: candidate,
  });
  if (!departmentCandidate) {
    return next(new AppError("Aday bulunamadı.", 400));
  }
  let student = await Student.findById(departmentCandidate.studentInfos);
  student.isCandidate = false;
  await Candidate.findByIdAndDelete(departmentCandidate._id);
  await student.save();
  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});
