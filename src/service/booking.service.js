import Booking from "../repository/booking.repository.js";
import BookingFlight from "../repository/booking_flight.repository.js";
import { flightResponse } from "../utils/api.utils.js";
import { publishToQueue, subscribeToQueue } from "./rabbitMQ.js";
import dotenv from "dotenv";
const GATEWAY_URL = process.env.GATEWAY_URL;

class BookingService {
    constructor() {
        this.bookingRepository = new Booking();
        this.bookingFlightRepository = new BookingFlight();
    }

    async createBooking(user_id, payload, token) {
        const booking = await this.bookingRepository.createBooking(user_id);
        let allBookings = [];
        for (let entry of payload) {
            console.log(entry);

            let flight = await fetch(
                `${process.env.GATEWAY_URL}/flight/flight/${entry.flightId}`,
                {
                    credentials: "include",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            flight = await flight.json();
            let factor = flight.data.class_price_factor[entry.class];
            entry.price = Math.ceil(flight.data.price * factor);

            const booking_flight =
                await this.bookingFlightRepository.createBookingFlight(
                    booking.id,
                    entry
                );
            const queuePayload = {
                flight_id: entry.flightId,
                seat_number: entry.seatId,
            };
            await publishToQueue("new-booking", JSON.stringify(queuePayload));

            let res = await fetch(
                `${process.env.GATEWAY_URL}/flight/flight/update/booked-seat/${entry.flightId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        flightId: entry.flightId,
                    }),
                }
            );
            res = await res.json();

            allBookings.push(booking_flight);
        }
        return allBookings;
    }

    async deleteBooking(id) {
        return await this.bookingRepository.deleteBooking(id);
    }

    async getAllBookings() {
        return await this.bookingRepository.getAllBookings();
    }

    async getBookingById(id) {
        return await this.bookingRepository.getBookingById(id);
    }

    async getBookingsByUserId(user_id) {
        return await this.bookingRepository.getBookingsByUserId(user_id);
    }

    async updateUserIdById(id, user_id) {
        return await this.bookingRepository.updateUserIdById(id, user_id);
    }

    async getAllJourneysByUserId(user_id) {
        const bookings = await this.bookingRepository.getBookingsByUserId(
            user_id
        );
        const journeys = [];
        for (let booking of bookings) {
            const journey = await this.getJourneyByBookingId(booking.id);
            if (journey.length != 0) journeys.push(journey);
        }
        return journeys;
    }

    async getJourneyByBookingId(booking_id) {
        let journey = [];
        try {
            const allFlights =
                await this.bookingFlightRepository.getBookingFlightsByBookingId(
                    booking_id
                );
            let map = new Map();
            for (let flight of allFlights) {
                let value = [];
                if (map.has(flight.leg_order)) {
                    value = map.get(flight.leg_order);
                }
                value.push(flight);
                map.set(flight.leg_order, value);
            }
            for (let [key, passengers] of map) {
                let res = await fetch(
                    `${GATEWAY_URL}/flight/flight/${passengers[0].flight_id}`
                );
                res = await res.json();
                let flight = flightResponse(res.data);
                flight.booking_id = passengers[0].booking_id;

                let passenger_arr = [];
                passengers.forEach((passenger) => {
                    passenger_arr.push({
                        name: passenger.passenger_name,
                        age: passenger.passenger_age,
                        email: passenger.email,
                        seat_number: passenger.seat_number,
                        status: passenger.booking_status,
                        price: passenger.price,
                    });
                });
                flight.passengers = passenger_arr;
                journey[key - 1] = flight;
            }
        } catch (error) {
            throw new Error(error);
        }
        return journey;
    }

    async getBookingDateByBookingId(booking_id) {
        return await this.bookingRepository.getBookingDateByBookingId(
            booking_id
        );
    }
}

export default new BookingService();
