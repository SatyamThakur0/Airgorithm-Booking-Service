import { getPool } from "../utils/dbPool.utils.js";

class Booking {
    constructor() {
        this.pool = getPool();
    }

    createBooking = async (user_id) => {
        const client = await this.pool.connect();
        try {
            const query = `INSERT INTO booking (user_id) VALUES ($1) RETURNING *;`;
            const result = await client.query(query, [user_id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };
    deleteBooking = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `DELETE FROM booking WHERE id = $1 RETURNING *`;
            const result = await client.query(query, [id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };
    getAllBookings = async () => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM booking;`;
            const result = await client.query(query);
            return result.rows;
        } finally {
            client.release();
        }
    };
    getBookingById = async (id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM booking WHERE id = $1`;
            const result = await client.query(query, [id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };
    getBookingsByUserId = async (user_id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT * FROM booking WHERE user_id = $1 order by created_at desc`;
            const result = await client.query(query, [user_id]);
            return result.rows;
        } finally {
            client.release();
        }
    };
    updateUserIdById = async (id, user_id) => {
        const client = await this.pool.connect();
        try {
            const query = `UPDATE booking SET user_id = $1 WHERE id = $2 RETURNING *;`;
            const result = await client.query(query, [user_id, id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };
    getBookingDateByBookingId = async (booking_id) => {
        const client = await this.pool.connect();
        try {
            const query = `SELECT created_at FROM booking WHERE id = $1;`;
            const result = await client.query(query, [booking_id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    };
}
export default Booking;
