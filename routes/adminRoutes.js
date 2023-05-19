const express = require("express");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const router = express.Router();

//test için
router.route("/create").post(adminController.createAdmin);

router.route("/").get(adminController.getAllStudents);

router.route("/:id").get(adminController.getStudent);

router.route("/candidates").get(adminController.getAllDepartmentCandidates);

router
  .route("/candidates/winners")
  .get(
    authController.checkElectionStatusForEndElection,
    adminController.announceDepartmentWinners
  );

router
  .route("/announcements")
  .get(adminController.getAnnouncements)
  .post(adminController.makeAnnouncement);

router.route("/tickets").get(adminController.getTickets);

router.route("/electionStart").post(adminController.startElection);

router.route("/electionEnd").put(adminController.endElection);

module.exports = router;
