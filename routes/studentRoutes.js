const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

router
    .route("/:id")
    .get(studentController.getCandidatesFromStudentsDepartment)

router
    .route("/:id/:cid")
    .put(studentController.voteDepartmentCandidate) //post da olabilir burası

router
    .route("/votes/:id/")
    .get(studentController.getCandidatesVoteFromStudentsDepartment)


module.exports = router;

