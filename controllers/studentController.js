const Student = require("../models/studentModel");
const Candidate = require("../models/departmentCandidateModel");
const Ticket = require("../models/ticketModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getCandidatesFromStudentsDepartment = catchAsync(
  async (req, res, next) => {
    const student = await Student.findById(req.params.id);

    const candidates = await Candidate.find({
      "studentInfos.department": student.department,
    });

    res.status(200).json({
      status: "success",
      data: {
        candidates,
      },
    });
  }
);

exports.voteDepartmentCandidate = catchAsync(async (req, res, next) => {
  const student = req.params.id;
  const candidate = req.params.cid;
  if (student.isVotedForDepartment) {
    return next(new AppError("Öğrenci zaten oy kullanmış.", 400));
  }
  const votingTime = new Date.now();
  const votedCandidate = await Candidate.findByIdAndUpdate(
    candidate,
    { $inc: { voteCount: 1 } },
    { new: true, runValidators: true }
  );
  const votedStudent = await Student.findByIdAndUpdate(
    student,
    { isVotedForDepartment: true },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      votedCandidate,
      votedStudent,
      votingTime,
    },
  });
});

exports.getCandidatesVoteFromStudentsDepartment = catchAsync(
  async (req, res, next) => {
    const student = await Student.findById(req.params.id);

    const candidates = await Candidate.find({
      "studentInfos.department": student.department,
    });

    res.status(200).json({
      status: "success",
      data: {
        candidates,
        candidatesVote: candidates.voteCount,
      },
    });
  }
);

exports.sendTicket = catchAsync(async (req, res, next) => {
  const { studentInfos, ticketTitle, ticketDescription } = req.body;
  const student = await Student.findById(studentInfos);
  if (!student) {
    return next(new AppError("No student found with that ID", 404));
  }
  const newTicket = new Ticket({
    ticketTitle,
    ticketDescription,
    studentInfos: studentInfos,
  });
  await newTicket.save();
  res.status(200).json({
    status: "success",
    data: {
      newTicket,
    },
  });
});
