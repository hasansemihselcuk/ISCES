const express = require("express");
const authController = require("./../controllers/authController");
const studentController = require("../controllers/studentController");
const router = express.Router();


router
    .post("/login", authController.login);

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

