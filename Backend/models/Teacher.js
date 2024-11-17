import mongoose from "mongoose";
import baseUserSchema from "./User.js"; // Import the base schema

const teacherSchema = new mongoose.Schema({
    jobTitle: {type: String},
    coursesTaught: [{ type: String }],
    researchInterests: [{ type: String }],
    departments: [{ type: String }],
    publications: [{
        title: String,
        journal: String,
        year: Number,
        link: String
    }]
});

// Merge teacher-specific schema with the base user schema
const Teacher = mongoose.model("Teacher", new mongoose.Schema({
    ...baseUserSchema.obj, // Spread the base schema fields
    ...teacherSchema.obj   // Add teacher-specific fields
}));

export default Teacher;
