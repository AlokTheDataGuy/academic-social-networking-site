import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

app.use(bodyParser.json());
app.use("/users", userRoutes);

mongoose.connect(dbUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

app.get('/', (req, res) =>{
    res.send("hello, World!");
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})