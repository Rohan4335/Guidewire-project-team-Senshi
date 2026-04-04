const express = require('express');
const { policyData, zones } = require('../data/mockData');
const { authenticateTokenOptional } = require('../middleware/auth');

const router = express.Router();

// GET /api/policies
router.get('/', authenticateTokenOptional, (req, res) => {
  try {
    return res.json({
      success: true,
      data: {
        ...policyData,
        zones,
      },
    });
  } catch (error) {
    console.error('Policies error:', error);
    return res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Failed to load policies',
    });
  }
});

module.exports = router;
