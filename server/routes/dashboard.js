const express = require('express');
const { dashboardData } = require('../data/mockData');

const router = express.Router();

// GET /api/dashboard
router.get('/', (req, res) => {
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
});

module.exports = router;
