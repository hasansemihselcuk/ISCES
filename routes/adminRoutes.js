const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router
    .route("/")
    .get(adminController.getAllStudents)
    .post(adminController.createStudent);

router
    .route("/:id")
    .get(adminController.getStudent)
    .put(adminController.updateStudent);

module.exports = router;
