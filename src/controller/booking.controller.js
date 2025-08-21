import BookingService from "../service/booking.service.js";
import { subscribeToQueue } from "../service/rabbitMQ.js";
import { ApiResponse, ApiError } from "../utils/api.utils.js";

class BookingController {
    async createBooking(req, res) {
        try {
            const payload = req.body;
            // Use the authenticated user's ID from the token
            const user_id = req.user.id;
            const token = req.cookies.token;
            const allBookings = await BookingService.createBooking(
                user_id,
                payload,
                token
            );

            return res
                .status(201)
                .json(
                    new ApiResponse(
                        true,
                        "Booking created",
                        201,
                        allBookings
                    ).toJSON()
                );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(
                    new ApiError(error.message, error.status || 500).toJSON()
                );
        }
    }

    async deleteBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await BookingService.deleteBooking(id);
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        true,
                        "Booking deleted",
                        200,
                        booking
                    ).toJSON()
                );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(
                    new ApiError(error.message, error.status || 500).toJSON()
                );
        }
    }

    async getAllBookings(req, res) {
        try {
            const bookings = await BookingService.getAllBookings();
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        true,
                        "All bookings",
                        200,
                        bookings
                    ).toJSON()
                );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(
                    new ApiError(error.message, error.status || 500).toJSON()
                );
        }
    }

    async getBookingById(req, res) {
        try {
            const { id } = req.params;
            const booking = await BookingService.getBookingById(id);
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        true,
                        "Booking found",
                        200,
                        booking
                    ).toJSON()
                );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(
                    new ApiError(error.message, error.status || 500).toJSON()
                );
        }
    }

    async getBookingsByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const bookings = await BookingService.getBookingsByUserId(user_id);
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        true,
                        "Bookings for user",
                        200,
                        bookings
                    ).toJSON()
                );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(
                    new ApiError(error.message, error.status || 500).toJSON()
                );
        }
    }

    async updateUserIdById(req, res) {
        try {
            const { id } = req.params;
            const { user_id } = req.body;
            const booking = await BookingService.updateUserIdById(id, user_id);
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        true,
                        "Booking updated",
                        200,
                        booking
                    ).toJSON()
                );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(
                    new ApiError(error.message, error.status || 500).toJSON()
                );
        }
    }

    async getAllJourneysByUserId(req, res) {
        try {

            const { id } = req.user;

            const journeys = await BookingService.getAllJourneysByUserId(id);

            return res
                .status(200)
                .json(
                    new ApiResponse(true, "Journeys", 200, journeys).toJSON()
                );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(
                    new ApiError(error.message, error.status || 500).toJSON()
                );
        }
    }

    async getBookingDateByBookingId(req, res) {
        try {
            const { booking_id } = req.params;
            const booking_date = await BookingService.getBookingDateByBookingId(
                booking_id
            );
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        true,
                        "Booking date fetched.",
                        200,
                        booking_date
                    ).toJSON()
                );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(
                    new ApiError(error.message, error.status || 500).toJSON()
                );
        }
    }
}

export default new BookingController();
