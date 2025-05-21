const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Alumni = require('../models/Alumni');
const Admin = require('../models/Admin');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id from token
    let user;
    
    // Try to find user in each collection
    user = await Student.findById(decoded.id);
    if (user) {
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: 'student',
        role: user.role
      };
      return next();
    }
    
    user = await Faculty.findById(decoded.id);
    if (user) {
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: 'faculty',
        role: user.role
      };
      return next();
    }
    
    user = await Alumni.findById(decoded.id);
    if (user) {
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: 'alumni',
        role: user.role
      };
      return next();
    }
    
    user = await Admin.findById(decoded.id);
    if (user) {
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: 'admin',
        role: user.role
      };
      return next();
    }
    
    user = await User.findById(decoded.id);
    if (user) {
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        role: user.role
      };
      return next();
    }

    // If no user found
    if (!user) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `User role ${req.user.role} is not authorized to access this route` 
      });
    }
    next();
  };
};

// Grant access to specific user types
exports.authorizeUserType = (...userTypes) => {
  return (req, res, next) => {
    if (!userTypes.includes(req.user.userType)) {
      return res.status(403).json({ 
        message: `User type ${req.user.userType} is not authorized to access this route` 
      });
    }
    next();
  };
};
