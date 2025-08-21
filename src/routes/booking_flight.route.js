import { Router } from "express";
import BookingFlightController from "../controller/booking_flight.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/",
    authenticateToken,
    BookingFlightController.createBookingFlight
);
router.delete(
    "/:id",
    authenticateToken,
    BookingFlightController.deleteBookingFlight
);
router.get(
    "/",
    authenticateToken,
    BookingFlightController.getAllBookingFlights
);
router.get(
    "/:id",
    authenticateToken,
    BookingFlightController.getBookingFlightById
);
router.get(
    "/booking/:booking_id",
    authenticateToken,
    BookingFlightController.getBookingFlightsByBookingId
);
router.get(
    "/flight/:flight_id",
    authenticateToken,
    BookingFlightController.getBookingFlightsByFlightId
);
router.get(
    "/seats/:flight_id",
    authenticateToken,
    BookingFlightController.getBookingSeatsByFlightId
);
router.patch(
    "/:id/booking_id",
    authenticateToken,
    BookingFlightController.updateBookingIdById
);
router.patch(
    "/:id/flight_id",
    authenticateToken,
    BookingFlightController.updateFlightIdById
);
router.patch(
    "/:id/passenger_name",
    authenticateToken,
    BookingFlightController.updatePassengerNameById
);
router.patch(
    "/:id/passenger_age",
    authenticateToken,
    BookingFlightController.updatePassengerAgeById
);
router.patch(
    "/:id/leg_order",
    authenticateToken,
    BookingFlightController.updateLegOrderById
);

export default router;
