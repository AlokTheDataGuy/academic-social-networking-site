const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Alumni = require('../models/Alumni');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { userType } = req.body;

    // Check if email already exists in any user collection
    const emailExists = await checkEmailExists(req.body.email);
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    let user;

    switch (userType) {
      case 'student':
        // Validate student-specific fields
        if (!req.body.rollNumber || !req.body.batch || !req.body.program || !req.body.semester || !req.body.department) {
          return res.status(400).json({ message: 'Please provide all required student information' });
        }
        user = await Student.create(req.body);
        break;

      case 'faculty':
        // Validate faculty-specific fields
        if (!req.body.employeeId || !req.body.designation || !req.body.department || !req.body.joiningDate) {
          return res.status(400).json({ message: 'Please provide all required faculty information' });
        }
        user = await Faculty.create(req.body);
        break;

      case 'alumni':
        // Validate alumni-specific fields
        if (!req.body.graduationYear || !req.body.degree || !req.body.department || !req.body.rollNumber) {
          return res.status(400).json({ message: 'Please provide all required alumni information' });
        }
        user = await Alumni.create(req.body);
        break;

      case 'admin':
        // Admin creation should be restricted
        return res.status(403).json({ message: 'Admin accounts can only be created by super admins' });

      default:
        return res.status(400).json({ message: 'Invalid user type' });
    }

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Helper function to check if email exists in any user collection
const checkEmailExists = async (email) => {
  const studentExists = await Student.findOne({ email });
  const facultyExists = await Faculty.findOne({ email });
  const alumniExists = await Alumni.findOne({ email });
  const adminExists = await Admin.findOne({ email });
  const userExists = await User.findOne({ email });

  return studentExists || facultyExists || alumniExists || adminExists || userExists;
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in any of the collections
    let user = await Student.findOne({ email }).select('+password');
    let userType = 'student';

    if (!user) {
      user = await Faculty.findOne({ email }).select('+password');
      userType = 'faculty';
    }

    if (!user) {
      user = await Alumni.findOne({ email }).select('+password');
      userType = 'alumni';
    }

    if (!user) {
      user = await Admin.findOne({ email }).select('+password');
      userType = 'admin';
    }

    if (!user) {
      user = await User.findOne({ email }).select('+password');
      userType = user ? user.userType : null;
    }

    // If no user found in any collection
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated. Please contact admin.' });
    }

    // Create response object with common fields
    const responseUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType || userType,
      role: user.role,
      token: generateToken(user._id)
    };

    // Add type-specific fields to response
    switch (user.userType || userType) {
      case 'student':
        responseUser.rollNumber = user.rollNumber;
        responseUser.batch = user.batch;
        responseUser.program = user.program;
        responseUser.semester = user.semester;
        break;
      case 'faculty':
        responseUser.employeeId = user.employeeId;
        responseUser.designation = user.designation;
        responseUser.department = user.department;
        break;
      case 'alumni':
        responseUser.graduationYear = user.graduationYear;
        responseUser.degree = user.degree;
        responseUser.currentCompany = user.currentCompany;
        responseUser.currentPosition = user.currentPosition;
        break;
      case 'admin':
        responseUser.adminLevel = user.adminLevel;
        responseUser.permissions = user.permissions;
        break;
    }

    res.status(200).json(responseUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const { id, userType } = req.user;

    let user;

    // Find user based on userType
    switch (userType) {
      case 'student':
        user = await Student.findById(id).select('-password');
        break;
      case 'faculty':
        user = await Faculty.findById(id).select('-password');
        break;
      case 'alumni':
        user = await Alumni.findById(id).select('-password');
        break;
      case 'admin':
        user = await Admin.findById(id).select('-password');
        break;
      default:
        user = await User.findById(id).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { id, userType } = req.user;

    let user;

    // Find user based on userType
    switch (userType) {
      case 'student':
        user = await Student.findById(id);
        break;
      case 'faculty':
        user = await Faculty.findById(id);
        break;
      case 'alumni':
        user = await Alumni.findById(id);
        break;
      case 'admin':
        user = await Admin.findById(id);
        break;
      default:
        user = await User.findById(id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Common fields that can be updated for all user types
    const commonFields = ['name', 'bio', 'department', 'interests', 'skills', 'profilePicture', 'coverPhoto'];

    // Update common fields
    commonFields.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // Update user type specific fields
    switch (userType) {
      case 'student':
        const studentFields = ['batch', 'program', 'semester', 'coursesEnrolled', 'academicAchievements'];
        studentFields.forEach(field => {
          if (req.body[field] !== undefined) {
            user[field] = req.body[field];
          }
        });
        break;

      case 'faculty':
        const facultyFields = ['designation', 'specialization', 'coursesTaught', 'researchInterests', 'publications', 'officeHours'];
        facultyFields.forEach(field => {
          if (req.body[field] !== undefined) {
            user[field] = req.body[field];
          }
        });
        break;

      case 'alumni':
        const alumniFields = ['currentCompany', 'currentPosition', 'workExperience'];
        alumniFields.forEach(field => {
          if (req.body[field] !== undefined) {
            user[field] = req.body[field];
          }
        });
        break;
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { id, userType } = req.user;

    let user;

    // Find user based on userType
    switch (userType) {
      case 'student':
        user = await Student.findById(id).select('+password');
        break;
      case 'faculty':
        user = await Faculty.findById(id).select('+password');
        break;
      case 'alumni':
        user = await Alumni.findById(id).select('+password');
        break;
      case 'admin':
        user = await Admin.findById(id).select('+password');
        break;
      default:
        user = await User.findById(id).select('+password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if current password is correct
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
