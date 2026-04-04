/**
 * Authentication Middleware
 * Validates JWT tokens and adds user context to requests
 */

const { tokens, users } = require('../data/mockData');

/**
 * Verify Bearer token and attach user info to request
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required. Please login first.',
      });
    }

    // Validate token
    const userId = tokens[token];
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token. Please login again.',
      });
    }

    // Find user
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found. Please login again.',
      });
    }

    // Attach user to request
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication failed. Please try again.',
    });
  }
};

/**
 * Optional authentication - doesn't fail if no token, but adds user if valid
 */
const authenticateTokenOptional = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const userId = tokens[token];
      if (userId) {
        const user = users.find((u) => u.id === userId);
        if (user) {
          req.user = user;
          req.token = token;
        }
      }
    }

    next();
  } catch (error) {
    console.error('Optional authentication error:', error);
    next(); // Continue anyway
  }
};

module.exports = {
  authenticateToken,
  authenticateTokenOptional,
};
