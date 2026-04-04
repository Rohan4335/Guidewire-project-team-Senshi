const express = require('express');
const { body, validationResult } = require('express-validator');
const { users, tokens } = require('../data/mockData');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Validation middleware
const validatePhone = [
  body('phone')
    .trim()
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),
];

const validateRegistration = [
  body('phone')
    .trim()
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('platform')
    .optional()
    .isIn(['Zomato', 'Swiggy', 'Zepto', 'Blinkit'])
    .withMessage('Invalid platform selected'),
  body('zone')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Zone must be provided'),
  body('city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('City must be provided'),
];

// Validation error handler middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: errorMessages,
    });
  }
  next();
};

// POST /api/auth/login
router.post('/login', validatePhone, handleValidationErrors, (req, res) => {
  try {
    const { phone } = req.body;

    // Find existing user or create session for any valid number
    let user = users.find((u) => u.phone === phone);

    if (!user) {
      user = {
        id: `usr_${uuidv4().slice(0, 8)}`,
        name: 'Delivery Partner',
        phone,
        platform: null,
        zone: null,
        city: null,
        role: 'Partner',
        avatar: null,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
    }

    const token = `giguard_${uuidv4()}`;
    tokens[token] = user.id;

    console.log('User login successful', { phone, userId: user.id });

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          platform: user.platform,
          zone: user.zone,
          city: user.city,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Failed to process login request',
    });
  }
});

// POST /api/auth/register
router.post('/register', validateRegistration, handleValidationErrors, (req, res) => {
  try {
    const { phone, name, platform, zone, city } = req.body;

    let user = users.find((u) => u.phone === phone);

    if (user) {
      // Update existing user with registration details
      user.name = name || user.name;
      user.platform = platform || user.platform;
      user.zone = zone || user.zone;
      user.city = city || user.city;
      user.role = platform ? `${platform} Partner` : user.role;
    } else {
      user = {
        id: `usr_${uuidv4().slice(0, 8)}`,
        name: name || 'Delivery Partner',
        phone,
        platform: platform || null,
        zone: zone || null,
        city: city || null,
        role: platform ? `${platform} Partner` : 'Partner',
        avatar: null,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
    }

    const token = `giguard_${uuidv4()}`;
    tokens[token] = user.id;

    console.log('User registration successful', { phone, userId: user.id, platform });

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          platform: user.platform,
          zone: user.zone,
          city: user.city,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Failed to process registration request',
    });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token && tokens[token]) {
      delete tokens[token];
      console.log('User logout successful');
    }

    return res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process logout request',
    });
  }
});

module.exports = router;
