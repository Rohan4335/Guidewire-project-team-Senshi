const express = require('express');
const { policyData, zones } = require('../data/mockData');

const router = express.Router();

// GET /api/policies
router.get('/', (req, res) => {
  return res.json({
    success: true,
    data: {
      ...policyData,
      zones,
    },
  });
});

module.exports = router;
