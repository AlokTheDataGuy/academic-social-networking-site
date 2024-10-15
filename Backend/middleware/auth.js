import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

// Authentication Middleware
export const auth = async (req, res, next) => {
    try {
        // Get token from the Authorization header
        const token = req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user info to request object (userId and role)
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };

        // Check if user still exists (token might be valid, but the user could be deleted)
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        next(); // Pass control to the next middleware or controller
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
