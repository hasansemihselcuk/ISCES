const express = require("express");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/makeRep/:id").post(adminController.makeRepresentative);

router.route("/").get(adminController.getAllRepresentatives);

module.exports = router;