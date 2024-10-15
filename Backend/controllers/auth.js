import User from "../models/User.js"; // Make sure you have the user model ready
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes

// Signup Controller
export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Send OTP Controller (For verification or password reset)
export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + OTP_EXPIRY_TIME;

        // Send OTP via email (configure nodemailer)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        // Save OTP and expiry to user
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        return res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Change Password Controller
export const changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const userId = req.user.userId; // Assuming user ID is available from auth middleware

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
