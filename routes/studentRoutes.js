const express = require("express");
const authController = require("./../controllers/authController");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.post("/login", authController.login);

router.route("/:id").get(studentController.getCandidatesFromStudentsDepartment);

router
  .route("/:id/:cid")
  .put(
    authController.checkElectionStatus,
    studentController.voteDepartmentCandidate
  );

router
  .route("/votes/:id/")
  .get(studentController.getCandidatesVoteFromStudentsDepartment);

router.route("/sendTicket").post(studentController.sendTicket);

module.exports = router;
