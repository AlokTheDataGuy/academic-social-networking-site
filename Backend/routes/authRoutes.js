import express from "express";
const router = express.Router();

//Controllers
const {
    signup, 
    login,
    sendOTP, 
    changePassword
} = require("../controllers/auth");

//Reset Password
const {
    resetPasswordToken, 
    resetPasssword
} = require("../controllers/resetPassword");

//Middleware
const { auth } = require('../middleware/');

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