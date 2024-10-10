import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    bio: {type: String},
    profilePicLink: { type: String },
    location: { type: String },
    contactNumber: { type: Number },
    dateOfBirth: { type: Date },
    qualifications: [{type: String}],
    skills: [{ type: String }],
    hobbies: [{ type: String }],
    interests: [{ type: String }],
    linkedInProfile: { type: String },
    githubProfile: { type: String },
    achievements: [{ type: String }], // For example: ['Mentor', 'Event Organizer']


    //Tracking whether users have completed their profiles
    profileCompletionStatus: { type: Boolean, default: false },

    // Alumni or teacher-specific
    jobTitle: {type: String},
    courses: [{type: String}],

    // Student-specific
    appliedJobs: [{type: mongoose.Schema.Types.ObjectId, ref: "Job"}],
    internshipApplications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    program: { type: String },
    session: { type: Number },
    enrolledCourses: [{ type: String }], //Both Alumni & students

    //Alumni-specific
    yearOfPassing: { type: Number },
    company: { type: String },
    workExperience: [{
        title: String,
        company: String,
        from: Date,
        to: Date,
        description: String
    }],
    
    //Teachers-Specific
    coursesTaught: [{ type: String }],
    researchInterests: [{ type: String }],
    departments: [{ type: String }],
    publications: [{
        title: String,
        journal: String,
        year: Number,
        link: String
    }],


    //Admins
    privileges: [{ type: String }], // E.g., ['user_management', 'content_moderation']
    activityLogs: [{
        action: String,
        description: String,
        timestamp: Date
    }],
    
    // for Analytics
    lastLogin: { type: Date },
    loginCount: { type: Number, default: 0 }


}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports=User;