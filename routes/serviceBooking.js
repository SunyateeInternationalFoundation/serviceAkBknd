const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/serviceBooking");

router.get("/provider/:id", authControllers.getProvider);

module.exports = router;
