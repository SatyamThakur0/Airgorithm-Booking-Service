import BookingFlight from "../repository/booking_flight.repository.js";

class BookingFlightService {
    constructor() {
        this.bookingFlightRepository = new BookingFlight();
    }

    async createBookingFlight(
        booking_id,
        flight_id,
        passenger_name,
        passenger_age,
        leg_order
    ) {
        return await this.bookingFlightRepository.createBookingFlight(
            booking_id,
            flight_id,
            passenger_name,
            passenger_age,
            leg_order
        );
    }

    async deleteBookingFlight(id) {
        return await this.bookingFlightRepository.deleteBookingFlight(id);
    }

    async getAllBookingFlights() {
        return await this.bookingFlightRepository.getAllBookingFlights();
    }

    async getBookingFlightById(id) {
        return await this.bookingFlightRepository.getBookingFlightById(id);
    }

    async getBookingFlightsByBookingId(booking_id) {
        return await this.bookingFlightRepository.getBookingFlightsByBookingId(
            booking_id
        );
    }

    async getBookingFlightsByFlightId(flight_id) {
        return await this.bookingFlightRepository.getBookingFlightsByFlightId(
            flight_id
        );
    }

    async updateBookingStatus(payload) {
        return await this.bookingFlightRepository.updateBookingStatus(
            JSON.parse(payload)
        );
    }

    async getBookingSeatsByFlightId(flight_id) {
        let bookedSeats = [];
        const result =
            await this.bookingFlightRepository.getBookingSeatsByFlightId(
                flight_id
            );
        for (let seat of result) {
            bookedSeats.push(seat.seat_number);
        }

        return bookedSeats;
    }

    async updateBookingIdById(id, booking_id) {
        return await this.bookingFlightRepository.updateBookingIdById(
            id,
            booking_id
        );
    }

    async updateFlightIdById(id, flight_id) {
        return await this.bookingFlightRepository.updateFlightIdById(
            id,
            flight_id
        );
    }

    async updatePassengerNameById(id, passenger_name) {
        return await this.bookingFlightRepository.updatePassengerNameById(
            id,
            passenger_name
        );
    }

    async updatePassengerAgeById(id, passenger_age) {
        return await this.bookingFlightRepository.updatePassengerAgeById(
            id,
            passenger_age
        );
    }

    async updateLegOrderById(id, leg_order) {
        return await this.bookingFlightRepository.updateLegOrderById(
            id,
            leg_order
        );
    }
}

export default new BookingFlightService();
