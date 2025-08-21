import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.route.js";
import { PORT } from "./config/env.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToRabbitMQ, subscribeToQueue } from "./service/rabbitMQ.js";

dotenv.config();
const app = express();
app.use(
    cors({
        origin: [`${process.env.FRONTEND_URL}`,`http://localhost:5174`],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
connectToRabbitMQ();

app.get("/", (req, res) => {
    return res.json({ ok: true, message: "Booking service is running..." });
});

app.use("/booking", router);

app.listen(PORT, () => {
    console.log(`Booking Service is running on PORT : ${PORT}`);
    subscribeToQueue("new-booking");
});
