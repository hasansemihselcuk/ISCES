const express = require("express");
const mapController = require("../controllers/mapController");
const router = express.Router();

router.route("/").get(mapController.getCandidatesByDepartment);
router
  .route("/control")
  .get(mapController.getControl)
  .post(mapController.createControl);

module.exports = router;
