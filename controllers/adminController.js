const Student = require("../models/studentModel");
const DepartmentCandidate = require("../models/departmentCandidateModel");
const Election = require("../models/departmentElectionModel");
const Announce = require("../models/announceModel");
const Ticket = require("../models/ticketModel");
const Admin = require("../models/adminModel");
const Department = require("../models/departmentModel");
const Representative = require("../models/departmentRepModel");
const Notification = require("../models/notificationModel");
const Control = require("../models/controlModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getElectionInfos = catchAsync(async (req, res, next) => {
  const election = await Election.find();

  res.status(200).json({
    status: "success",
    data: {
      election,
    },
  });
});

exports.makeRepresentative = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const candidate = await DepartmentCandidate.find({ studentInfos: id });
  if (!candidate) {
    return next(new AppError("No candidate found with that ID", 404));
  }
  const newRepresentative = new Representative({
    studentInfos: id,
  });
  const student = await Student.findByIdAndUpdate(
    id,
    { isRepresentative: true, isCandidate: false, isNominee: false },
    { new: true, runValidators: true }
  );
  const deleteCandidate = await DepartmentCandidate.findOneAndDelete({
    studentInfos: id,
  });
  await student.save();

  await newRepresentative.save();
  res.status(200).json({
    status: "success",
    data: {
      newRepresentative,
    },
  });
});

exports.announceRepresentative = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const student = await Student.findOne({
    _id: id,
    isAnnounced: false,
  });
  if (!student) {
    return next(new AppError("No student found with that ID", 404));
  }
  const representative = await Representative.findOne({
    studentInfos: id,
  }).populate({
    path: "studentInfos",
    populate: {
      path: "department",
      select: "name",
    },
  });
  if (!representative) {
    return next(new AppError("No representative found with that ID", 404));
  }
  const newNotification = new Notification({
    message: `${representative.studentInfos.department.name} temsilcisi oldunuz.`,
    to: id,
  });
  await newNotification.save();
  const newAnnounce = new Announce({
    title: "Departman Temsilcisi Seçildi",
    description: `${representative.studentInfos.name} ${representative.studentInfos.surname} ${representative.studentInfos.department.name} departmanı temsilcisi oldu.`,
  });
  await newAnnounce.save();

  student.isAnnounced = true;
  await student.save();

  res.status(200).json({
    status: "success",
    data: {
      newAnnounce,
      newNotification,
      student,
    },
  });
});

exports.cancelRepresentative = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const representative = await Representative.findOneAndDelete({
    studentInfos: id,
  });
  if (!representative) {
    return next(new AppError("No representative found with that ID", 404));
  }
  const student = await Student.findByIdAndUpdate(
    id,
    {
      isCandidate: false,
      isNominee: false,
      isRepresentative: false,
      isAnnounced: false,
    },
    { new: true, runValidators: true }
  );
  await student.save();
  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.getNominations = catchAsync(async (req, res, next) => {
  const nominations = await Student.find({ isNominee: true }).populate(
    "department",
    "name"
  );
  console.log(nominations);
  res.status(200).json({
    status: "success",
    results: nominations.length,
    data: {
      nominations,
    },
  });
});

exports.getAllRepresentatives = catchAsync(async (req, res, next) => {
  const representatives = await Representative.find().populate({
    path: "studentInfos",
    populate: {
      path: "department",
      select: "name",
    },
  });
  console.log(representatives);

  res.status(200).json({
    status: "success",
    results: representatives.length,
    data: {
      representatives,
    },
  });
});

exports.getUnannouncedRepresentatives = catchAsync(async (req, res, next) => {
  const representatives = await Student.find({
    isRepresentative: true,
    isAnnounced: false,
  }).populate("department", "name");
  console.log(representatives);

  res.status(200).json({
    status: "success",
    results: representatives.length,
    data: {
      representatives,
    },
  });
});

exports.createAdmin = catchAsync(async (req, res, next) => {
  const { name, surname, iztechMail, password } = req.body;
  const newAdmin = new Admin({
    name,
    surname,
    iztechMail,
    password,
  });
  await newAdmin.save();
  res.status(200).json({
    status: "success",
    data: {
      newAdmin,
    },
  });
});

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
  const candidates = await DepartmentCandidate.find().populate({
    path: "studentInfos",
    populate: {
      path: "department",
      select: "name",
    },
  });

  res.status(200).json({
    status: "success",
    results: candidates.length,
    data: {
      candidates,
    },
  });
});

exports.startElection = catchAsync(async (req, res, next) => {
  const departmentElection = new Election({
    isStarted: true,
    isEnded: false,
    isActive: true,
  });

  await departmentElection.save();
  const control = await Control.findOne({
    isStarted: false,
    isEnded: false,
    isActive: false,
  });
  control.isStarted = true;
  control.isActive = true;
  await control.save();
  const newAnnounce = new Announce({
    title: "Seçim Başladı",
    description: "Departman seçimleri başladı.",
  });
  await newAnnounce.save();

  res.status(200).json({
    status: "success",
    message: "Seçim başlatıldı.",
    data: {
      departmentElection,
    },
  });
});

exports.editElection = catchAsync(async (req, res, next) => {
  const election = await Election.findOne({
    isStarted: true,
    isEnded: false,
    isActive: true,
  });
  if (!election) {
    return next(new AppError("Seçim henüz başlamadı veya bitti", 400));
  }
  const { endDate } = req.body;
  const parsedEndDate = new Date(endDate);
  election.endDate = parsedEndDate;
  await election.save();
  res.status(200).json({
    status: "success",
    message: "Seçim tarihi güncellendi.",
    data: {
      election,
    },
  });
});


exports.endElection = catchAsync(async (req, res, next) => {
  const election = await Election.findOne({
    isStarted: true,
    isEnded: false,
    isActive: true,
  });
  if (!election) {
    return next(new AppError("Seçim henüz başlamadı veya bitti", 400));
  }
  election.isEnded = true;
  election.isActive = false;
  const control = await Control.findOne({
    isStarted: true,
    isEnded: false,
    isActive: true,
  });
  control.isEnded = true;
  control.isActive = false;
  await control.save();
  await election.save();
  const newAnnounce = new Announce({
    title: "Seçim Bitti",
    description: "Departman seçimleri bitti.",
  });
  await newAnnounce.save();
  res.status(200).json({
    status: "success",
    message: "Seçim sonlandırıldı.",
    data: {
      election,
    },
  });
});

exports.makeAnnouncement = catchAsync(async (req, res, next) => {
  const body = Object.keys(req.body)[0];
  const fixedResponse = body.replace(/'/g, '"');
  const parsedResponse = JSON.parse(fixedResponse);
  const { title, description } = parsedResponse;
  const newAnnounce = new Announce({
    title,
    description,
  });
  await newAnnounce.save();
  res.status(200).json({
    status: "success",
    data: {
      newAnnounce,
    },
  });
});

exports.getAnnouncements = catchAsync(async (req, res, next) => {
  const announces = await Announce.find().sort({ date: -1 });
  res.status(200).json({
    status: "success",
    results: announces.length,
    data: {
      announces,
    },
  });
});

exports.getTickets = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.find()
    .sort({ ticketDate: -1 })
    .populate("studentInfos", "name surname");

  const formattedTickets = tickets.map((ticket) => {
    const fullName =
      ticket.studentInfos.name + " " + ticket.studentInfos.surname;
    return {
      ...ticket._doc,
      studentNameSurname: fullName,
    };
  });

  res.status(200).json({
    status: "success",
    results: formattedTickets.length,
    data: {
      tickets: formattedTickets,
    },
  });
});

exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) {
    return next(new AppError("No ticket found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
