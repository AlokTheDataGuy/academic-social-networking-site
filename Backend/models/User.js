import mongoose from "mongoose";

const baseUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'alumni', 'teacher', 'admin'],
        required: true
    },
    sex: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    bio: {type: String},
    profilePicLink: { type: String },
    location: { type: String },
    contactNumber: { type: String },
    dateOfBirth: { type: Date },

    qualifications: [{type: String}],
    skills: [{ type: String }],
    hobbies: [{ type: String }],
    interests: [{ type: String }],

    linkedInProfile: { type: String },
    githubProfile: { type: String },
    achievements: [{ type: String }],

    profileCompletionStatus: { type: Boolean, default: false },
    lastLogin: { type: Date },
    loginCount: { type: Number, default: 0 }
}, {timestamps: true});

const User = mongoose.model("User", baseUserSchema);

export default User;

