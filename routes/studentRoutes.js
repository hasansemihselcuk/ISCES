const express = require("express");
const authController = require("./../controllers/authController");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.post("/login", authController.login);

router.route("/sendTicket").post(studentController.sendTicket);

router.route("/:id").get(studentController.getCandidatesFromStudentsDepartment);

router
  .route("/votes/:id/")
  .get(studentController.getCandidatesVoteFromStudentsDepartment);

router.route("/department/:id").get(studentController.getDepartmentName);

router.route("/notifications/:id").get(studentController.getNotifications);

router.route("/:id/:cid").put(
  //authController.checkElectionStatus,
  studentController.voteDepartmentCandidate
);

module.exports = router;
