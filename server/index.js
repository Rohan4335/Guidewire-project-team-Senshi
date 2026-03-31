const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const claimsRoutes = require('./routes/claims');
const policiesRoutes = require('./routes/policies');
const premiumRoutes = require('./routes/premium');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/claims', claimsRoutes);
app.use('/api/policies', policiesRoutes);
app.use('/api/premium', premiumRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'GiGuard API is running' });
});

app.listen(PORT, () => {
  console.log(`🛡️  GiGuard API Server running on http://localhost:${PORT}`);
});
