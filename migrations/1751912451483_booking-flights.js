/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.sql(`
        CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');
        `);
    pgm.sql(`
        CREATE TABLE booking_flight (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            booking_id UUID NOT NULL,
            flight_id UUID NOT NULL,
            passenger_name VARCHAR(50) NOT NULL,
            passenger_age INTEGER NOT NULL,
            email VARCHAR(255),
            leg_order INTEGER NOT NULL,
            booking_status booking_status DEFAULT 'PENDING',
            price INTEGER DEFAULT NULL,
            seat_number VARCHAR(10) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (booking_id) REFERENCES booking(id),
            CHECK (leg_order > 0 AND passenger_age > 0)
        )
        `);
    // multiple passenger to store handle in existing model
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`DROP TABLE booking_flight`);
    pgm.sql(`DROP TYPE booking_status`);
};
