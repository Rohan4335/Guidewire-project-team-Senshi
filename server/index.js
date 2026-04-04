const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const claimsRoutes = require('./routes/claims');
const policiesRoutes = require('./routes/policies');
const premiumRoutes = require('./routes/premium');
const { sanitizeBody } = require('./middleware/sanitize');

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// ============ Security Middleware ============
// Add security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: CORS_ORIGIN ? CORS_ORIGIN.split(',').map(url => url.trim()) : [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
}));

// Body parser middleware with increased limit for production
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Input sanitization middleware
app.use(sanitizeBody);

// ============ Rate Limiting ============
// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/api/health',
});

// Auth rate limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
  message: 'Too many login attempts, please try again after 15 minutes.',
  skipSuccessfulRequests: true,
  keyGenerator: (req) => req.body.phone || req.ip,
});

app.use(globalLimiter);

// ============ Request Logging Middleware ============
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// ============ Routes ============
app.use('/api/auth', authLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/claims', claimsRoutes);
app.use('/api/policies', policiesRoutes);
app.use('/api/premium', premiumRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'GiGuard API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// ============ 404 Handler ============
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

// ============ Global Error Handler ============
app.use((err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  console.error('Error:', {
    message,
    status,
    ...(isDevelopment && { stack: err.stack }),
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString(),
  });

  // Don't expose error stack in production
  const response = {
    success: false,
    error: isDevelopment ? message : 'An error occurred. Please try again later.',
    status,
  };

  if (isDevelopment && err.stack) {
    response.stack = err.stack;
  }

  res.status(status).json(response);
});

// ============ Graceful Shutdown ============
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`
🛡️  GiGuard API Server
📍 Running on http://localhost:${PORT}
📝 Environment: ${process.env.NODE_ENV || 'development'}
🔒 Security: Helmet enabled, Rate limiting active
CORS: ${CORS_ORIGIN || 'Multiple origins configured'}
  `);
});
