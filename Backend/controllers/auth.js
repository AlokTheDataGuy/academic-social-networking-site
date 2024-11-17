import User from "../models/User.js"; // Make sure you have the user model ready
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// JWT secret from environment variables
const JWT_SECRET = "notagoodsecret";
const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes

// Signup Controller
export const signup = async (req, res) => {
    try {
        const { name, email, password, role, sex } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, role, sex });
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
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "12h" });

        return res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: "Server error", error });
    }
};

// Fetch User Details Controller
export const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming user ID is available from auth middleware

        // Find the user by ID, excluding the password field for security
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user details
        return res.status(200).json({ user });
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
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.userId; // Assuming user ID is available from auth middleware

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the old password with the current password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
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



// Complete Profile Controller
export const completeProfile = async (req, res) => {
    try {
        const { 
            contactNumber, 
            location, 
            bio, 
            profilePicLink, 
            qualifications, 
            skills, 
            hobbies, 
            interests, 
            linkedInProfile, 
            githubProfile, 
            achievements 
        } = req.body;
        
        const userId = req.user.userId; // Assuming user ID is available from auth middleware

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's profile fields
        if (contactNumber) user.contactNumber = contactNumber;
        if (location) user.location = location;
        if (bio) user.bio = bio;
        if (profilePicLink) user.profilePicLink = profilePicLink;
        if (qualifications) user.qualifications = qualifications;
        if (skills) user.skills = skills;
        if (hobbies) user.hobbies = hobbies;
        if (interests) user.interests = interests;
        if (linkedInProfile) user.linkedInProfile = linkedInProfile;
        if (githubProfile) user.githubProfile = githubProfile;
        if (achievements) user.achievements = achievements;

        // Mark profile as complete if all mandatory fields are filled
        const isProfileComplete = contactNumber && location && skills.length > 0 && interests.length > 0 ;
        user.profileCompletionStatus = isProfileComplete;

        await user.save();

        return res.status(200).json({ message: "Profile completed successfully", profileCompletionStatus: isProfileComplete });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
