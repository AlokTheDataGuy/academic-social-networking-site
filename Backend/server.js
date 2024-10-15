import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// import studentRoutes from "./routes/studentRoutes.js";
// import alumniRoutes from "./routes/almuniRoutes.js";
// import teacherRoutes from "./routes/teacherRoutes.js"; 
// import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;


mongoose.connect(dbUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

app.get('/', (req, res) =>{
    res.send("hello, World!");
});


// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// app.use("/api/student", studentRoutes);
// app.use("/api/alumni", alumniRoutes);
// app.use("/api/teacher", teacherRoutes);
// app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Academic Social Networking Platform")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})