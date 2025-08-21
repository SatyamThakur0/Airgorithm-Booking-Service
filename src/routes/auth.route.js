import { Router } from "express";
import { generateToken } from "../utils/auth.utils.js";
import { ApiResponse, ApiError } from "../utils/api.utils.js";

const router = Router();

// Test route to generate a token (for development/testing only)
router.post("/test-token", (req, res) => {
    try {
        const { user_id, email, role } = req.body;

        if (!user_id || !email) {
            return res
                .status(400)
                .json(
                    new ApiError("user_id and email are required", 400).toJSON()
                );
        }

        const userData = {
            user_id: parseInt(user_id),
            email,
            role: role || "user",
        };

        const token = generateToken(userData);

        return res.status(200).json(
            new ApiResponse(true, "Token generated successfully", 200, {
                token,
                user: userData,
            }).toJSON()
        );
    } catch (error) {
        return res.status(500).json(new ApiError(error.message, 500).toJSON());
    }
});

export default router;
