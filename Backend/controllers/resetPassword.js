import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// Reset Password Token Controller
export const resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a password reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Set token expiry time (1 hour)
        const resetTokenExpiry = Date.now() + 3600000;

        // Send reset link via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `Click the following link to reset your password: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        // Save reset token and expiry time to user
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        return res.status(200).json({ message: "Password reset link sent to email" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Reset Password Controller
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Find user by reset token and check if it's still valid
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear reset token fields
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
