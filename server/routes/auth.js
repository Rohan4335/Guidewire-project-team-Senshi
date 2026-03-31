const express = require('express');
const { users, tokens } = require('../data/mockData');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { phone } = req.body;

  if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid 10-digit mobile number.',
    });
  }

  // Find existing user or create session for any valid number
  let user = users.find((u) => u.phone === phone);

  if (!user) {
    user = {
      id: `usr_${uuidv4().slice(0, 8)}`,
      name: 'Delivery Partner',
      phone,
      platform: null,
      zone: null,
      city: null,
      role: 'Partner',
      avatar: null,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
  }

  const token = `giguard_${uuidv4()}`;
  tokens[token] = user.id;

  return res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        platform: user.platform,
        zone: user.zone,
        city: user.city,
        role: user.role,
      },
      token,
    },
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { phone, name, platform, zone, city } = req.body;

  if (!phone || phone.length !== 10) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid 10-digit mobile number.',
    });
  }

  let user = users.find((u) => u.phone === phone);

  if (user) {
    // Update existing user with registration details
    user.name = name || user.name;
    user.platform = platform || user.platform;
    user.zone = zone || user.zone;
    user.city = city || user.city;
    user.role = platform ? `${platform} Partner` : user.role;
  } else {
    user = {
      id: `usr_${uuidv4().slice(0, 8)}`,
      name: name || 'Delivery Partner',
      phone,
      platform: platform || null,
      zone: zone || null,
      city: city || null,
      role: platform ? `${platform} Partner` : 'Partner',
      avatar: null,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
  }

  const token = `giguard_${uuidv4()}`;
  tokens[token] = user.id;

  return res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        platform: user.platform,
        zone: user.zone,
        city: user.city,
        role: user.role,
      },
      token,
    },
  });
});

module.exports = router;
