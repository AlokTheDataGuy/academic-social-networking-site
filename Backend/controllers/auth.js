import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Signup function
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role, sex } = req.body;

        if (!name || !email || !password || !role || !role) {
            return res.status(400).json({message: "Please enter all required fields."});
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: "User already exists. "});
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            sex,
            profileCompletionStatus: false //Initially false
        });

        await newUser.save();

        //Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); 

        res.status(201).json({token, message: "User created successfully"})
    } catch (err) {
        res.status(500).jspn({message: "Error during signup"});
    }
}


exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Validate Input 
        if(!email || !password) {
            return res.status(400).json({message: "Please enter both email and password."});
        }


        //Check if user exists
        const user = await User.findOne({ email });
        if(!isMatch) {
            return res.status(400).json({message: "User not found."});
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials."});
        }

        //Generate token
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expires: '1h' });
        res.status(200).json({token, message: "Login sucessful"});
    } catch (err) {
        res.status(500).json({ message: "Error during login" });
    }
};


// Change Password 
// exports.changePassword = async (req, res) => {
//     try {
//         const { newPassword } = req.body;

//     }
// }