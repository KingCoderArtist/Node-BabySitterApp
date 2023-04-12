var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  createBooking,
  getBooking,
  getBookingById,
  getBookingByUser,
  updateBooking,
  deleteBooking,
} = require("./../controllers/booking");
const { isBookingRole } = require("./../middlewares/customAuth");
const { uploadPhoto } = require("./../middlewares/uploadBooking");
const isAuthenticated = require("./../middlewares/tokenAuth");

router.post(
  "/booking",
  uploadPhoto,
  [
    check("name", "name field is required").notEmpty(),
    check("startDate", "startDate field is required").notEmpty(),
    check("endDate", "endDate field is required").notEmpty(),
    check("registerLocation", "registerLocation field is required").notEmpty(),
  ],
  isAuthenticated.required,
  isBookingRole,
  createBooking
);

router.get("/booking", isAuthenticated.required, getBooking);

router.get(
  "/booking/:id",
  isAuthenticated.required,
  isBookingRole,
  getBookingById
);

router.get(
  "/booking-by-user",
  isAuthenticated.required,
  isBookingRole,
  getBookingByUser
);

router.put(
  "/booking/:id",
  isAuthenticated.required,
  isBookingRole,
  updateBooking
);

router.delete(
  "/booking/:id",
  isAuthenticated.required,
  isBookingRole,
  deleteBooking
);

module.exports = router;
