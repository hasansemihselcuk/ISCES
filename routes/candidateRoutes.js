const express = require("express");
const candidateController = require("../controllers/candidateController");

const router = express.Router();

router
    .route("/:id")
    .post(candidateController.candidateApplication);
    //delete niye hata veriyo anlamadım
    //.delete(candidateController.cancelCandidateApplication);

router
    .route("/:id")
    .delete(candidateController.cancelCandidateApplication);

module.exports = router;