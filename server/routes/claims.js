const express = require('express');
const { claimsData } = require('../data/mockData');
const { authenticateTokenOptional } = require('../middleware/auth');

const router = express.Router();

// GET /api/claims
router.get('/', authenticateTokenOptional, (req, res) => {
  try {
    // Simulate slight variation in environment stats
    const data = {
      ...claimsData,
      environmentStats: claimsData.environmentStats.map((stat) => ({
        ...stat,
        value: stat.label === 'Rainfall'
          ? (parseFloat(stat.value) + (Math.random() * 2 - 1)).toFixed(1)
          : stat.value,
      })),
    };

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Claims error:', error);
    return res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Failed to load claims',
    });
  }
});

module.exports = router;
