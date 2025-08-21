import { getPool } from "../utils/dbPool.utils.js";

class BookingFlight {
    pool;
    constructor() {
        this.pool = getPool();
    }

    createBookingFlight = async (booking_id, payload) => {
        const client = await this.pool.connect();
        try {
            const query = `INSERT INTO booking_flight (booking_id, flight_id, passenger_name, passenger_age, leg_order, seat_number, email, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
            const result = await client.query(query, [
                booking_id,
                payload.flightId,
                payload.name,
                payload.age,
                payload.legOrder + 1,
                payload.seatId,
                payload.email,
                payload.price,
            ]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };

    deleteBookingFlight = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `DELETE FROM booking_flight WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };

    getAllBookingFlights = async () => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM booking_flight;`;
            const result = await client.query(query);
            return result.rows;
        } finally {
            client.release();
        }
    };

    getBookingFlightById = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM booking_flight WHERE id = $1`;
            const result = await client.query(query, [id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };

    getBookingFlightsByBookingId = async (booking_id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM booking_flight WHERE booking_id = $1 order by leg_order asc`;
            const result = await client.query(query, [booking_id]);
            return result.rows;
        } finally {
            client.release();
        }
    };

    getBookingFlightsByFlightId = async (flight_id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM booking_flight WHERE flight_id = $1`;
            const result = await client.query(query, [flight_id]);
            return result.rows;
        } finally {
            client.release();
        }
    };

    getBookingSeatsByFlightId = async (flight_id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT seat_number FROM booking_flight WHERE flight_id = $1`;
            const result = await client.query(query, [flight_id]);
            return result.rows;
        } finally {
            client.release();
        }
    };

    updateBookingStatus = async (payload) => {
        const client = await this.pool.connect();
        try {
            const query = `UPDATE booking_flight SET booking_status = 'CONFIRMED' WHERE flight_id = $1 AND seat_number = $2 RETURNING *`;
            const result = await client.query(query, [
                payload.flight_id,
                payload.seat_number,
            ]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };

    updateBookingIdById = async (id, booking_id) => {
        const client = await this.pool.connect();
        try {
            const query = `UPDATE booking_flight SET booking_id = $1 WHERE id = $2 RETURNING *;`;
            const result = await client.query(query, [booking_id, id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };

    updateFlightIdById = async (id, flight_id) => {
        const client = await this.pool.connect();
        try {
            const query = `UPDATE booking_flight SET flight_id = $1 WHERE id = $2 RETURNING *;`;
            const result = await client.query(query, [flight_id, id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };

    updatePassengerNameById = async (id, passenger_name) => {
        const client = await this.pool.connect();
        try {
            const query = `UPDATE booking_flight SET passenger_name = $1 WHERE id = $2 RETURNING *;`;
            const result = await client.query(query, [passenger_name, id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };

    updatePassengerAgeById = async (id, passenger_age) => {
        const client = await this.pool.connect();
        try {
            const query = `UPDATE booking_flight SET passenger_age = $1 WHERE id = $2 RETURNING *;`;
            const result = await client.query(query, [passenger_age, id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };

    updateLegOrderById = async (id, leg_order) => {
        const client = await this.pool.connect();
        try {
            const query = `UPDATE booking_flight SET leg_order = $1 WHERE id = $2 RETURNING *;`;
            const result = await client.query(query, [leg_order, id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };
}

export default BookingFlight;
