import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


router.get('/', async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;