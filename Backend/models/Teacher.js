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

// Merge with base schema
const Teacher = mongoose.model("Teacher", baseUserSchema.add(teacherSchema));
