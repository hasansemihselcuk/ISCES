const Student = require("../models/studentModel");
const Department = require("../models/departmentModel");
const Candidate = require("../models/departmentCandidateModel");
const Ticket = require("../models/ticketModel");
const Notification = require("../models/notificationModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getDepartmentName = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  const department = student.department;
  const depName = await Department.findOne({ _id: department }).populate({
    path: "name",
  });
  res.status(200).json({
    status: "success",
    data: {
      depName,
    },
  });
});

exports.getCandidatesFromStudentsDepartment = catchAsync(
  async (req, res, next) => {
    const student = await Student.findById(req.params.id);
    const department = student.department;

    const candidatesFromStudentsDepartment = await Candidate.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentInfos",
          foreignField: "_id",
          as: "studentInfos",
        },
      },
      {
        $unwind: "$studentInfos",
      },
      {
        $match: {
          "studentInfos.department": department,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        candidatesFromStudentsDepartment,
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

  const hasVoted = await Student.exists({
    _id: student,
    isVotedForDepartment: true,
  });
  if (hasVoted) {
    return next(new AppError("Öğrenci zaten oy kullanmış.", 400));
  }

  //const votingTime = new Date.now();
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
  const newNotification = new Notification({
    message: "Oyunuz başarıyla kaydedildi.",
    to: student,
  });
  await newNotification.save();
  res.status(200).json({
    status: "success",
    data: {
      votedCandidate,
      votedStudent,
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
  const studentInfos = req.params.id;
  const body = Object.keys(req.body)[0];
  const fixedResponse = body.replace(/'/g, '"');
  const parsedResponse = JSON.parse(fixedResponse);
  const { ticketTitle, ticketDescription } = parsedResponse;
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
  const newNotification = new Notification({
    message: "Ticket başarıyla gönderildi.",
    to: studentInfos,
  });
  await newNotification.save();
  res.status(200).json({
    status: "success",
    data: {
      newTicket,
    },
  });
});

exports.getNotifications = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;
  const notifications = await Notification.find({ to: studentId })
    .populate("to")
    .sort({ date: -1 });

  res.status(200).json({
    status: "success",
    data: {
      notifications,
    },
  });
});

exports.deleteNotification = catchAsync(async (req, res, next) => {
  const notificationId = req.params.id;
  const notification = await Notification.findByIdAndDelete(notificationId);

  res.status(200).json({
    status: "success",
    data: {
      notification,
    },
  });
});
