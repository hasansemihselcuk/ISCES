const express = require("express");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/makeRep/:id").post(adminController.makeRepresentative);

router.route("/").get(adminController.getAllRepresentatives);

router.route("/cancelRep/:id").delete(adminController.cancelRepresentative);

router.route("/announceRep/:id").post(adminController.announceRepresentative);

module.exports = router;
