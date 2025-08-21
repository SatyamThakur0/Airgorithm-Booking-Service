import amqp from "amqplib";
import dotenv from "dotenv";
import BookingFlightService from "../service/booking_flight.service.js";
dotenv.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL;
let connection, channel;

export const connectToRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log("✅Booking Service Connected to RabbitMQ...");
    } catch (error) {
        console.error("❌ Failed to connect to RabbitMQ:", error);
    }
};

export const publishToQueue = async (queue, data) => {
    try {
        if (!channel) await connectToRabbitMQ();
        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
        console.log(`📤 Message sent to queue "${queue}":`, data);
    } catch (error) {
        console.error("❌ Failed to publish message:", error);
    }
};

export const subscribeToQueue = async (queue) => {
    try {
        if (!channel) await connectToRabbitMQ();
        await channel.assertQueue(queue, { durable: true });
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const content = JSON.parse(msg.content.toString());
                console.log(`📥 Message got in queue "${queue}":`, content);
                const res = await BookingFlightService.updateBookingStatus(
                    content
                );
                channel.ack(msg);
            }
        });
        console.log(`📥 Subscribed to queue "${queue}"`);
    } catch (error) {
        console.error("❌ Failed to subscribe to queue:", error);
    }
};
