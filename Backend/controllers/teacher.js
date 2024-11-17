import User from "../models/User.js"; // Base User model
import Teacher from "../models/Teacher.js"; // Teacher model

// Complete Teacher Profile Controller with User Model
export const completeTeacherProfile = async (req, res) => {
    try {
        const { 
            jobTitle, 
            coursesTaught, 
            researchInterests, 
            departments, 
            publications 
        } = req.body;

        const userId = req.user.userId; // Assuming user ID is available from auth middleware

        // Find the user by user ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure the user is a teacher
        if (user.role !== "teacher") {
            return res.status(403).json({ message: "User is not authorized to update teacher profile" });
        }

        // Update teacher-specific fields
        if (jobTitle) teacher.jobTitle = jobTitle;
        if (coursesTaught) teacher.coursesTaught = coursesTaught;
        if (researchInterests) teacher.researchInterests = researchInterests;
        if (departments) teacher.departments = departments;
        if (publications) teacher.publications = publications;

        // Check if the teacher's profile is complete
        const isProfileComplete = jobTitle && coursesTaught.length > 0 && researchInterests.length > 0 && departments.length > 0;

        teacher.profileCompletionStatus = isProfileComplete;

        // Save the updated teacher profile
        await teacher.save();

        return res.status(200).json({ 
            message: "Teacher profile completed successfully", 
            profileCompletionStatus: isProfileComplete 
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
   