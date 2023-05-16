const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router
    .route("/")
    .get(adminController.getAllStudents)

router
    .route("/:id")
    .get(adminController.getStudent)

module.exports = router;
