import BookingFlightService from "../service/booking_flight.service.js";
import { ApiResponse, ApiError } from "../utils/api.utils.js";

class BookingFlightController {
    async createBookingFlight(req, res) {
        try {
            const {
                booking_id,
                flight_id,
                passenger_name,
                passenger_age,
                leg_order,
            } = req.body;
            const bookingFlight =
                await BookingFlightService.createBookingFlight(
                    booking_id,
                    flight_id,
                    passenger_name,
                    passenger_age,
                    leg_order
                );
            res.status(201).json(
                new ApiResponse(
                    true,
                    "Booking flight created",
                    201,
                    bookingFlight
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }

    async deleteBookingFlight(req, res) {
        try {
            const { id } = req.params;
            const bookingFlight =
                await BookingFlightService.deleteBookingFlight(id);
            res.status(200).json(
                new ApiResponse(
                    true,
                    "Booking flight deleted",
                    200,
                    bookingFlight
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }

    async getAllBookingFlights(req, res) {
        try {
            const bookingFlights =
                await BookingFlightService.getAllBookingFlights();
            res.status(200).json(
                new ApiResponse(
                    true,
                    "All booking flights",
                    200,
                    bookingFlights
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }

    async getBookingFlightById(req, res) {
        try {
            const { id } = req.params;
            const bookingFlight =
                await BookingFlightService.getBookingFlightById(id);
            res.status(200).json(
                new ApiResponse(
                    true,
                    "Booking flight found",
                    200,
                    bookingFlight
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }

    async getBookingFlightsByBookingId(req, res) {
        try {
            const { booking_id } = req.params;
            const bookingFlights =
                await BookingFlightService.getBookingFlightsByBookingId(
                    booking_id
                );
            res.status(200).json(
                new ApiResponse(
                    true,
                    "Booking flights for booking",
                    200,
                    bookingFlights
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }

    async getBookingFlightsByFlightId(req, res) {
        try {
            const { flight_id } = req.params;
            const bookingFlights =
                await BookingFlightService.getBookingFlightsByFlightId(
                    flight_id
                );
            res.status(200).json(
                new ApiResponse(
                    true,
                    "Booking flights for flight",
                    200,
                    bookingFlights
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }
    async getBookingSeatsByFlightId(req, res) {
        try {
            const { flight_id } = req.params;
            const bookingFlights =
                await BookingFlightService.getBookingSeatsByFlightId(
                    flight_id
                );
            res.status(200).json(
                new ApiResponse(
                    true,
                    "Booking flights for flight",
                    200,
                    bookingFlights
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }

    async updateBookingIdById(req, res) {
        try {
            const { id } = req.params;
            const { booking_id } = req.body;
            const bookingFlight =
                await BookingFlightService.updateBookingIdById(id, booking_id);
            res.status(200).json(
                new ApiResponse(
                    true,
                    "Booking flight updated (booking_id)",
                    200,
                    bookingFlight
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }

    async updateFlightIdById(req, res) {
        try {
            const { id } = req.params;
            const { flight_id } = req.body;
            const bookingFlight = await BookingFlightService.updateFlightIdById(
                id,
                flight_id
            );
            res.status(200).json(
                new ApiResponse(
                    true,
                    "Booking flight updated (flight_id)",
                    200,
                    bookingFlight
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }

    async updatePassengerNameById(req, res) {
        try {
            const { id } = req.params;
            const { passenger_name } = req.body;
            const bookingFlight =
                await BookingFlightService.updatePassengerNameById(
                    id,
                    passenger_name
                );
            res.status(200).json(
                new ApiResponse(
                    true,
                    "Booking flight updated (passenger_name)",
                    200,
                    bookingFlight
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }

    async updatePassengerAgeById(req, res) {
        try {
            const { id } = req.params;
            const { passenger_age } = req.body;
            const bookingFlight =
                await BookingFlightService.updatePassengerAgeById(
                    id,
                    passenger_age
                );
            res.status(200).json(
                new ApiResponse(
                    true,
                    "Booking flight updated (passenger_age)",
                    200,
                    bookingFlight
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }

    async updateLegOrderById(req, res) {
        try {
            const { id } = req.params;
            const { leg_order } = req.body;
            const bookingFlight = await BookingFlightService.updateLegOrderById(
                id,
                leg_order
            );
            res.status(200).json(
                new ApiResponse(
                    true,
                    "Booking flight updated (leg_order)",
                    200,
                    bookingFlight
                ).toJSON()
            );
        } catch (error) {
            res.status(error.status || 500).json(
                new ApiError(error.message, error.status || 500).toJSON()
            );
        }
    }
}

export default new BookingFlightController();
