const express = require("express");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const router = express.Router();

//test için
router.route("/create").post(adminController.createAdmin);

router.route("/").get(adminController.getAllStudents);

router
  .route("/candidates")
  .get(authController.protect, adminController.getAllDepartmentCandidates);

router
  .route("/nominations")
  .get(authController.protect, adminController.getNominations);

router
  .route("/announcements")
  .get(authController.protect, adminController.getAnnouncements)
  .post(authController.protect, adminController.makeAnnouncement);

router
  .route("/tickets")
  .get(authController.protect,
     adminController.getTickets);

router
  .route("/electionStart")
  .post(authController.protect, adminController.startElection);

router
  .route("/electionEnd")
  .put(authController.protect, adminController.endElection);

router.route("/:id").get(authController.protect, adminController.getStudent);

router
  .route("/deleteTicker/:id").delete(authController.protect, adminController.deleteTicket);

module.exports = router;
