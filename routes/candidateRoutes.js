const express = require("express");
const candidateController = require("../controllers/candidateController");

const router = express.Router();

router.route("/:id").put(candidateController.candidateApplication);

module.exports = router;