import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Alumni Home Route");
})

router.post("/createAlumni", (req, res) => {
    res.send("Add Work Experience");
})

export default router;