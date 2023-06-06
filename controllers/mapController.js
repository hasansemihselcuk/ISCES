const Student = require("../models/studentModel");
const axios = require("axios");
const DepartmentCandidate = require("../models/departmentCandidateModel");
const Election = require("../models/departmentElectionModel");
const Announce = require("../models/announceModel");
const Ticket = require("../models/ticketModel");
const Admin = require("../models/adminModel");
const Department = require("../models/departmentModel");
const Representative = require("../models/departmentRepModel");
const Notification = require("../models/notificationModel");
const catchAsync = require("../utils/catchAsync");
const Control = require("../models/controlModel");
const AppError = require("../utils/appError");

exports.getCandidatesByDepartment = catchAsync(async (req, res, next) => {
  const candidates = await DepartmentCandidate.find().populate({
    path: "studentInfos",
    populate: {
      path: "department",
      select: "name",
    },
    select: "name surname voteCount",
  });

  const simplifiedCandidates = candidates.map((candidate) => ({
    name: candidate.studentInfos.name,
    surname: candidate.studentInfos.surname,
    department: candidate.studentInfos.department.name,
    voteCount: candidate.voteCount,
  }));

  res.status(200).json({
    status: "success",
    results: simplifiedCandidates.length,
    data: {
      candidates: simplifiedCandidates,
    },
  });
});

exports.createControl = catchAsync(async (req, res, next) => {
  const control = new Control({});
  await control.save();
  res.status(200).json({
    status: "success",
    data: {
      control,
    },
  });
});

exports.getControl = catchAsync(async (req, res, next) => {
  const control = await Control.find();
  res.status(200).json({
    status: "success",
    data: {
      control,
    },
  });
});
