const Student = require("../models/studentModel");
const Candidate = require("../models/departmentCandidateModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.candidateApplication = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { isCandidate: true },
    { new: true, runValidators: true }
  );
  if (student.GPA < 2.75) {
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
  await newCandidate.save();
  res.status(200).json({
    status: "success",
    data: {
      newCandidate,
    },
  });
});

//bozuk gibi
exports.cancelCandidateApplication = catchAsync(async (req, res, next) => {
  try{
    const candidate = req.params.id;
    let student = await Candidate.findById(candidate);
    let oneStudent = await Student.findById(student.studentInfos);
    oneStudent.isCandidate = false;
    await Candidate.findByIdAndDelete(candidate);
    await oneStudent.save();

    res.status(200).json({
        status: "success",
        data: null
    });
  }catch(error){
    res.status(400).json({
        status: "error",
        message: "You might not be a candidate"
    });
}
});



