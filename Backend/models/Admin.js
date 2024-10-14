const adminSchema = new mongoose.Schema({
    privileges: [{ type: String }],
    activityLogs: [{
        action: String,
        description: String,
        timestamp: Date
    }]
});

// Merge with base schema
const Admin = mongoose.model("Admin", baseUserSchema.add(adminSchema));
