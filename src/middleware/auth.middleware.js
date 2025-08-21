import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["Authorization"];
    let token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    // If no token in header, try to get from cookies
    if (!token && req.cookies) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token is required",
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers["Authorization"];
    let token = authHeader && authHeader.split(" ")[1];

    // If no token in header, try to get from cookies
    if (!token && req.cookies) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token is required",
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export const optionalAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];

    // If no token in header, try to get from cookies
    if (!token && req.cookies) {
        token = req.cookies.token;
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            // Token is invalid, but we don't block the request
            req.user = null;
        }
    } else {
        req.user = null;
    }

    next();
};
