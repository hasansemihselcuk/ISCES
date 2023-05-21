const express = require("express");
const candidateController = require("../controllers/candidateController");

const router = express.Router();

router
  .route("/:id")
  .post(candidateController.candidateApplication)
  .delete(candidateController.cancelCandidateApplication);

module.exports = router;
