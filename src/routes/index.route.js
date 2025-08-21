import { Router } from "express";
import bookingRouter from "./booking.route.js";
import bookingFlightRouter from "./booking_flight.route.js";
import authRouter from "./auth.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/booking", bookingRouter);
router.use("/booking-flight", bookingFlightRouter);

export default router;
