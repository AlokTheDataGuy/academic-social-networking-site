import express from "express";
const router = express.Router();

//Controllers
import { completeTeacherProfile } from "../controllers/teacher.js";

//Middleware
import { auth } from '../middleware/auth.js';

//Auth Routes
router.post('/complete-profile', auth,  completeTeacherProfile);

export default router;