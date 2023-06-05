const express = require("express");
const candidateController = require("../controllers/candidateController");

const router = express.Router();

router
  .route("/:id")
  .post(candidateController.candidateApplication)
  .delete(candidateController.cancelCandidateApplication);

router
  .route("/nomineeApplication/:id")
  .put(candidateController.nomineeApplication);

router.route("/nomineeRejection/:id").put(candidateController.nomineeRejection);

module.exports = router;
