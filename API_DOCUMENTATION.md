# GiGuard API Endpoints Documentation

## Base URL
```
Development: http://localhost:3001/api
Production: https://api.yourdomain.com/api
```

## Authentication
Currently uses token-based authentication. Token is included in response after login/register.

## Rate Limiting Headers
All responses include:
```
RateLimit-Limit: 100
RateLimit-Remaining: 99
RateLimit-Reset: 1712145600
```

Auth endpoints use stricter limits (5 attempts per 15 minutes).

---

## 🔐 Authentication Endpoints

### POST /auth/login
Login user with phone number.

**Request:**
```json
{
  "phone": "9876543210"
}
```

**Validation:**
- Phone: Required, exactly 10 digits

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123de",
      "name": "Rahul Kumar",
      "phone": "9876543210",
      "platform": null,
      "zone": null,
      "city": null,
      "role": "Partner"
    },
    "token": "giguard_550e8400e29b41d4a716446655440000"
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    {
      "field": "phone",
      "message": "Phone number must be exactly 10 digits"
    }
  ]
}
```

**Rate Limited (429):**
```json
{
  "success": false,
  "error": "Too many login attempts, please try again after 15 minutes."
}
```

---

### POST /auth/register
Register or update user with platform and zone information.

**Request:**
```json
{
  "phone": "9876543210",
  "name": "Rahul Kumar",
  "platform": "Zomato",
  "zone": "Koramangala 4th Block",
  "city": "Bangalore, Karnataka"
}
```

**Validation:**
- Phone: Required, exactly 10 digits
- Name: 2-100 characters, letters/spaces/hyphens only
- Platform: One of [Zomato, Swiggy, Zepto, Blinkit]
- Zone: 2-100 characters
- City: 2-100 characters

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123de",
      "name": "Rahul Kumar",
      "phone": "9876543210",
      "platform": "Zomato",
      "zone": "Koramangala 4th Block",
      "city": "Bangalore, Karnataka",
      "role": "Zomato Partner"
    },
    "token": "giguard_550e8400e29b41d4a716446655440000"
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    {
      "field": "platform",
      "message": "Invalid platform selected"
    }
  ]
}
```

---

## 📊 Data Endpoints

### GET /dashboard
Get user dashboard data.

**Headers:**
```
Authorization: Bearer giguard_550e8400e29b41d4a716446655440000
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "weekOverview": {
      "earnedThisWeek": 2450,
      "potentialThisWeek": 4500,
      "weekForecast": "Moderate - Weather moderate. Light rainfall in afternoon 3-4 days.",
      "triggeredClaims": 2,
      "totalClaims": 12
    },
    "riskIndicators": {
      "rainRisk": "High",
      "windRisk": "Low",
      "temperatureRisk": "Moderate"
    },
    "payouts": [
      {
        "id": "payout_001",
        "amount": 500,
        "date": "2026-04-01",
        "reason": "Rainfall exceeded threshold",
        "zone": "Koramangala 4th Block"
      }
    ]
  }
}
```

---

### GET /claims
Get user's insurance claims.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "claims": [
      {
        "id": "claim_001",
        "date": "2026-04-03T14:30:00Z",
        "type": "Heavy Rainfall",
        "status": "Triggered",
        "payout": 500,
        "weather": {
          "rainfall": 45,
          "unit": "mm",
          "threshold": 40
        }
      }
    ]
  }
}
```

---

### GET /policies
Get user's insurance policies.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "policies": [
      {
        "id": "policy_001",
        "name": "Basic Rain Cover",
        "status": "Active",
        "coverageAmount": 5000,
        "premium": 99,
        "conditions": [
          "Rainfall > 35mm",
          "Duration > 2 hours"
        ],
        "expiryDate": "2026-12-31"
      }
    ]
  }
}
```

---

### GET /premium
Get premium plans for selected zone.

**Query Parameters:**
- `zoneId` (optional): Zone ID to get zone-specific pricing

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "zone": "Koramangala 4th Block",
    "riskLevel": "Moderate",
    "basePremium": 49,
    "plans": [
      {
        "id": "plan_basic",
        "name": "Basic Rain Cover",
        "monthlyPremium": 59,
        "coverageAmount": 5000,
        "trigger": "Rainfall > 35mm for 2+ hours",
        "isSelected": true
      },
      {
        "id": "plan_pro",
        "name": "Pro Weather Shield",
        "monthlyPremium": 99,
        "coverageAmount": 10000,
        "trigger": "Rainfall, Wind, Temperature",
        "isSelected": false
      }
    ]
  }
}
```

---

## 🏥 Health Endpoint

### GET /health
Check API health status.

**Success Response (200):**
```json
{
  "success": true,
  "message": "GiGuard API is running",
  "timestamp": "2026-04-03T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

## ❌ Common Error Codes

| Code | Error | Solution |
|------|-------|----------|
| 400 | Validation Error | Check required fields and format |
| 404 | Not Found | Endpoint doesn't exist |
| 429 | Rate Limited | Wait and retry after some time |
| 500 | Server Error | Contact support |

---

## 🔄 Request/Response Examples

### cURL Examples

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

**Register:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "phone":"9876543210",
    "name":"Rahul Kumar",
    "platform":"Zomato",
    "zone":"Koramangala 4th Block",
    "city":"Bangalore, Karnataka"
  }'
```

**Get Dashboard:**
```bash
curl -X GET http://localhost:3001/api/dashboard \
  -H "Authorization: Bearer giguard_550e8400e29b41d4a716446655440000"
```

---

## 📋 Response Structure

All responses follow this structure:

**Success:**
```json
{
  "success": true,
  "data": { /* endpoint-specific data */ }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message",
  "errors": [ /* optional: field-level errors */ ]
}
```

---

## 🔐 Security Notes

1. Always use HTTPS in production
2. Tokens expire after 24 hours (to be implemented)
3. Validate input on client and server
4. Don't expose sensitive data in logs
5. Use rate limiting to prevent abuse
6. Implement CORS for specific origins

---

**Version**: 1.0.0
**Last Updated**: 2026-04-03
**Status**: Production Ready
