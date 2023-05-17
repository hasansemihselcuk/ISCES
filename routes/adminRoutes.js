const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router
    .route("/")
    .get(adminController.getAllStudents)

router
    .route("/:id")
    .get(adminController.getStudent)


    
router
    .route("/candidates")
    .get(adminController.getAllDepartmentCandidates)

router
    .route("/candidates/winners")
    .get(adminController.announceDepartmentWinners)

module.exports = router;
