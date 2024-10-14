const studentSchema = new mongoose.Schema({
    program: { type: String },
    session: { type: Number },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    internshipApplications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

// Merge with base schema
const Student = mongoose.model("Student", baseUserSchema.add(studentSchema));
