const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.post("/login", authControllers.login);
router.post("/register", authControllers.signUp);
router.get("/provider/:id", authControllers.getProvider);
router.put("/provider/:id", authControllers.updateProvider)
router.get("/my-bookings/:id", authControllers.myBooking)
router.patch("/update-booking-status",authControllers.updateBookingStatus)

module.exports = router;
