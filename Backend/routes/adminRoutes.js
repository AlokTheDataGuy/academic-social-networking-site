import express from "express";
const router = express.Router();

router.get("/", (req,res) => {
    res.send("Admin Password");
})

router.post("/manageUsers", (res, req) => {
    res.send("Manage Users");
})


export default router;