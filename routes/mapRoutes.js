const express = require("express");
const mapController = require("../controllers/mapController");
const router = express.Router();

router.route("/").get(mapController.getCandidatesByDepartment);

module.exports = router;