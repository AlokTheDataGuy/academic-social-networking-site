import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use("/users", userRoutes);

mongoose.connect()