const express = require('express');
const { premiumData, zones } = require('../data/mockData');
const { authenticateTokenOptional } = require('../middleware/auth');

const router = express.Router();

// GET /api/premium
router.get('/', authenticateTokenOptional, (req, res) => {
  try {
    // Determine zone and risk multiplier based on query
    const zoneId = req.query.zoneId;
    const zone = zones.find((z) => z.id === zoneId) || zones[0];

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

    const selectedPlan = adjustedPlans.find((p) => p.isSelected);
    const selectedPrice = selectedPlan ? selectedPlan.price : premiumData.subscriptionSummary.weeklyTotal;

    return res.json({
      success: true,
      data: {
        ...premiumData,
        location: `${zone.name}, ${zone.city}`,
        plans: adjustedPlans,
        subscriptionSummary: {
          ...premiumData.subscriptionSummary,
          weeklyTotal: selectedPrice,
          gst: parseFloat(((selectedPrice * 0.18) / 1.18).toFixed(2)),
        },
      },
    });
  } catch (error) {
    console.error('Premium error:', error);
    return res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Failed to load premium data',
    });
  }
});

module.exports = router;
