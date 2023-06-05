const express = require("express");
const authController = require("../controllers/authController");
const candidateController = require("../controllers/candidateController");

const router = express.Router();

router
  .route("/:id")
  .post(authController.protect, candidateController.candidateApplication)
  .delete(
    authController.protect,
    candidateController.cancelCandidateApplication
  );

router
  .route("/nomineeApplication/:id")
  .put(authController.protect, candidateController.nomineeApplication);

router
  .route("/nomineeRejection/:id")
  .put(authController.protect, candidateController.nomineeRejection);

module.exports = router;
