/**
 * Input Validation & Sanitization Middleware
 * Sanitizes and validates user inputs for security
 */

/**
 * Sanitize a string - remove potentially harmful characters
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .trim()
    .replace(/[<>\"']/g, '') // Remove HTML/SQL special chars
    .slice(0, 1000); // Limit length
};

/**
 * Sanitize an object recursively
 */
const sanitizeObject = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return typeof obj === 'string' ? sanitizeString(obj) : obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = sanitizeObject(value);
  }
  return sanitized;
};

/**
 * Middleware to sanitize request body
 */
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }
  next();
};

module.exports = {
  sanitizeString,
  sanitizeObject,
  sanitizeBody,
};
