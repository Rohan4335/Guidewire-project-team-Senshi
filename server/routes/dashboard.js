const express = require('express');
const { dashboardData } = require('../data/mockData');
const { authenticateTokenOptional } = require('../middleware/auth');

const router = express.Router();

// GET /api/dashboard
router.get('/', authenticateTokenOptional, (req, res) => {
  try {
    // Simulate dynamic data by slightly varying values
    const data = {
      ...dashboardData,
      protectedEarnings: {
        ...dashboardData.protectedEarnings,
        current: dashboardData.protectedEarnings.current + Math.floor(Math.random() * 50),
      },
    };

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Failed to load dashboard',
    });
  }
});

module.exports = router;
