import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Teacher Home Route");
});

export default router;