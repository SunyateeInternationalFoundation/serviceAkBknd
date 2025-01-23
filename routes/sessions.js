const express = require("express");
const router = express.Router();
const sessionControllers = require("../controllers/serviceBooking");

router.get("/:id", sessionControllers.getTherapy);
router.patch("/:id", sessionControllers.updateSession);

module.exports = router;
