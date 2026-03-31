const express = require('express');
const { claimsData } = require('../data/mockData');

const router = express.Router();

// GET /api/claims
router.get('/', (req, res) => {
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
});

module.exports = router;
