// Role-Based Access Control Middleware
export const roleBasedAccess = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role;

            // Check if user's role is in the list of allowed roles
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: "Access denied. You do not have permission to perform this action." });
            }

            next(); // Pass control to the next middleware or controller
        } catch (error) {
            return res.status(500).json({ message: "Server error", error });
        }
    };
};
