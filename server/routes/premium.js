const express = require('express');
const { premiumData, zones } = require('../data/mockData');

const router = express.Router();

// GET /api/premium
router.get('/', (req, res) => {
  // Adjust premium based on location risk
  const zone = zones[0]; // Default to first zone
  let riskMultiplier = 1.0;

  if (zone.riskLevel === 'High Risk') {
    riskMultiplier = 1.3;
  } else if (zone.riskLevel === 'Moderate Risk') {
    riskMultiplier = 1.0;
  } else {
    riskMultiplier = 0.85;
  }

  const adjustedPlans = premiumData.plans.map((plan) => ({
    ...plan,
    price: Math.round(plan.price * riskMultiplier),
  }));

  return res.json({
    success: true,
    data: {
      ...premiumData,
      plans: adjustedPlans,
      subscriptionSummary: {
        ...premiumData.subscriptionSummary,
        weeklyTotal: adjustedPlans.find((p) => p.isSelected)?.price || premiumData.subscriptionSummary.weeklyTotal,
        gst: parseFloat((((adjustedPlans.find((p) => p.isSelected)?.price || 59) * 0.18) / 1.18).toFixed(2)),
      },
    },
  });
});

module.exports = router;
