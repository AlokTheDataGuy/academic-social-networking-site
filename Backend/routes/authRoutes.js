import express from "express";
const router = express.Router();

//Controllers
import { signup, login, sendOTP, changePassword } from "../controllers/auth.js";

//Reset Password
import { resetPasswordToken, resetPassword } from "../controllers/resetPassword.js";

//Middleware
import { auth } from '../middleware/auth.js';

//Auth Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/sendotp', sendOTP);
router.post('/changepassword', auth, changePassword);

// Route for generating a reset password token
router.post('/reset-password-token', resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


export default router;