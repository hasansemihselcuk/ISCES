const Student = require("../models/studentModel");
const Candidate = require("../models/departmentCandidateModel");
const Department = require("../models/departmentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find();
  res.status(200).json({
    status: "success",
    results: students.length,
    data: {
      students,
    },
  });
});

exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return next(new AppError("No student found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.getAllDepartmentCandidates = catchAsync(async (req, res, next) => {
  const candidates = await Candidate.find();
  const infos = candidates.map((candidate) => {
    return candidate.studentInfos;
  });
  res.status(200).json({
    status: "success",
    results: candidates.length,
    data: {
      infos,
    },
  });
});
//sonra tekrar kontrol edilcek
exports.announceDepartmentWinners = catchAsync(async (req, res, next) => {
  const departments = await Department.find();
  const winnersByDepartment = await Promise.all(
    departments.map(async (department) => {
      const winners = await DepartmentCandidate.find({
        department: department._id,
      })
        .sort({ voteCount: -1 })
        .populate("studentInfos");
      const topThreeWinners = winners.slice(0, 3);
      return {
        department: department.name,
        winners: topThreeWinners,
      };
    })
  );
  res.status(200).json({
    status: "success",
    winnersByDepartment,
  });
});
