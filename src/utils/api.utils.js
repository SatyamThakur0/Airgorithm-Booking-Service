export class ApiResponse {
    data;
    message;
    ok;
    status;
    constructor(ok = true, message = "success", status = 200, data = null) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.ok = ok;
    }

    toJSON = () => {
        return {
            ok: this.ok,
            data: this.data,
            status: this.status,
            message: this.message,
        };
    };
}

export class ApiError extends Error {
    status;
    stack;
    errors;
    message;
    constructor(
        message = "Something went wrong",
        status = 500,
        errors = [],
        stack = ""
    ) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON = () => {
        return {
            ok: false,
            message: this.message,
            errors: this.errors,
            status: this.status,
        };
    };
}

export const flightResponse = (flight) => {
    return {
        flight_number: flight.flight_number,
        departure_time: flight.departure_time,
        arrival_time: flight.arrival_time,
        status: flight.status,
        airplane: {
            name: flight.airplane.name,
            code: flight.airplane.code,
        },
        source: {
            airport: {
                name: flight.source.airport.name,
                code: flight.source.airport.code,
            },
            city: {
                name: flight.source.city.name,
            },
            country: {
                name: flight.source.country.name,
                code: flight.source.country.code,
            },
        },
        destination: {
            airport: {
                name: flight.destination.airport.name,
                code: flight.destination.airport.code,
            },
            city: {
                name: flight.destination.city.name,
            },
            country: {
                name: flight.destination.country.name,
                code: flight.destination.country.code,
            },
        },
    };
};

export const bookingResponse = (journey) => {
    let resJourney = [];
    for (let flight of journey) {
        let resFlight = [];
        for (let passenger of flight) {
            let resPassenger = {
                name: passenger.passenger_name,
                email: passenger.email,
                age: passenger.passenger_age,
                seat: passenger.seat_number,
            };
        }
    }
};
