const alumniSchema = new mongoose.Schema({
    yearOfPassing: { type: Number },
    company: { type: String },
    workExperience: [{
        title: String,
        company: String,
        from: Date,
        to: Date,
        description: String
    }]
});
// Merge with base schema
const Alumni = mongoose.model("Alumni", baseUserSchema.add(alumniSchema));
