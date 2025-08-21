import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";

export const generateToken = (userData) => {
    const payload = {
        user_id: userData.user_id,
        email: userData.email,
        role: userData.role || "user",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
    };

    return jwt.sign(payload, JWT_SECRET);
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid token");
    }
};

export const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        throw new Error("Invalid token format");
    }
};
