import { Router } from "express";
import BookingController from "../controller/booking.controller.js";
import {
    authenticateToken,
    authenticateUser,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticateToken, BookingController.createBooking);
router.delete("/:id", authenticateToken, BookingController.deleteBooking);
router.get("/", authenticateToken, BookingController.getAllBookings);
router.get("/:id", authenticateToken, BookingController.getBookingById);
router.get(
    "/booking-date/:booking_id",
    authenticateToken,
    BookingController.getBookingDateByBookingId
);
router.get(
    "/user/:user_id",
    authenticateUser,
    BookingController.getBookingsByUserId
);
router.patch(
    "/:id/user_id",
    authenticateUser,
    BookingController.updateUserIdById
);
router.get(
    "/booked/journeys",
    authenticateUser,
    BookingController.getAllJourneysByUserId
);

export default router;
