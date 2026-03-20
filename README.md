<h1 align="center">giGuard</h1>
<h3 align="center">AI-Powered Parametric Insurance Platform</h3>
<h4 align="center">Software Requirements Specification (SRS)</h4>
<h4 align="center">For Food Delivery Workers (Swiggy / Zomato / Blinkit)</h4>

<hr>

<h2>1. Introduction</h2>

<h3>1.1 Purpose</h3>
<p>
This document defines the functional and non-functional requirements of giGuard,
a parametric insurance system designed to provide automated income protection
to gig delivery workers using real-time environmental data and AI-based decision systems.
</p>

<ul>
<li>Detect disruptions using real-world signals</li>
<li>Calculate risk using measurable parameters</li>
<li>Automatically trigger claims</li>
<li>Ensure fraud-resistant payouts</li>
</ul>

<hr>

<h3>1.2 Scope</h3>

<ul>
<li>Heavy rainfall disruption</li>
<li>Extreme temperature conditions</li>
<li>Severe pollution</li>
<li>Government restrictions</li>
</ul>

<p><b>Out of Scope:</b></p>
<ul>
<li>Medical insurance</li>
<li>Accident coverage</li>
<li>Vehicle damage</li>
</ul>

<hr>

<h3>1.3 Definitions</h3>

<table border="1">
<tr><th>Term</th><th>Description</th></tr>
<tr><td>Parametric Insurance</td><td>Automatic payout based on predefined triggers</td></tr>
<tr><td>Risk Score</td><td>Disruption likelihood (0–100)</td></tr>
<tr><td>Fraud Score</td><td>Suspicious activity probability (0–100)</td></tr>
</table>

<hr>

<h2>2. System Overview</h2>

<h3>2.1 Architecture</h3>

<pre>
User App
   ↓
API Layer
   ↓
Risk Engine + Fraud Engine
   ↓
Trigger Engine
   ↓
Claim Processor
   ↓
Payout System
</pre>

<hr>

<h3>2.2 External APIs</h3>

<ul>
<li>Weather API (rainfall, temperature)</li>
<li>AQI API (pollution levels)</li>
<li>Maps API (route validation)</li>
<li>Payment Gateway (UPI)</li>
</ul>

<hr>

<h2>3. Detailed System Features</h2>

<h3>3.1 Worker Registration</h3>

<p><b>Inputs:</b></p>
<ul>
<li>Platform type</li>
<li>Operating region (city-level)</li>
<li>Device verification token</li>
</ul>

<p><b>Output:</b> System-generated user ID</p>

<hr>

<h3>3.2 Risk Prediction</h3>

<pre>
Risk Score =
(0.30 × Weather Risk) +
(0.25 × Location Risk) +
(0.20 × Time Risk) +
(0.15 × Load Risk) +
(0.10 × History Risk)
</pre>

<p><b>Example:</b></p>
<pre>
Weather=80, Location=70, Time=60, Load=50, History=40
Risk Score = 65 (Medium Risk)
</pre>

<hr>

<h3>3.3 Premium Calculation</h3>

<pre>
Premium = Base × Risk Multiplier × Coverage Factor
</pre>

<ul>
<li>Base = ₹50</li>
<li>Risk Multiplier = 1.0 / 1.5 / 2.2</li>
<li>Coverage = 1.0 / 1.8</li>
</ul>

<p><b>Example:</b></p>
<pre>
Premium = 50 × 1.5 × 1.8 = ₹135/day
</pre>

<hr>

<h3>3.4 Event Monitoring</h3>

<table border="1">
<tr><th>Event</th><th>Threshold</th></tr>
<tr><td>Rain</td><td>>50mm</td></tr>
<tr><td>Heat</td><td>>45°C</td></tr>
<tr><td>Pollution</td><td>AQI > 300</td></tr>
</table>

<hr>

<h3>3.5 Claim Logic</h3>

<pre>
IF (event_triggered == TRUE)
AND (user_active == TRUE)
AND (fraud_score < 60)
→ APPROVE CLAIM
</pre>

<hr>

<h3>3.6 Payout Logic</h3>

<table border="1">
<tr><th>Severity</th><th>Payout</th></tr>
<tr><td>Low</td><td>₹100</td></tr>
<tr><td>Medium</td><td>₹300</td></tr>
<tr><td>High</td><td>₹700</td></tr>
</table>

<hr>

<h3>3.7 System Workflow</h3>

<pre>
User Active
   ↓
System Monitors APIs
   ↓
Event Triggered
   ↓
Fraud Check
   ↓
Claim Decision
   ↓
Payout Transfer
</pre>

<hr>

<h2>4. Adversarial Defense & Anti-Spoofing Strategy</h2>

<h3>4.1 Differentiation</h3>

<ul>
<li>Continuous motion tracking vs static spoof</li>
<li>Speed anomaly detection</li>
<li>Route validation with maps</li>
<li>Cluster anomaly detection</li>
</ul>

<h3>4.2 Multi-Signal Data</h3>

<ul>
<li>Sensor data (accelerometer)</li>
<li>Network consistency</li>
<li>Device integrity signals</li>
<li>Historical activity pattern</li>
</ul>

<h3>4.3 Fraud Score</h3>

<pre>
Fraud Score =
(0.30 × Movement Anomaly) +
(0.20 × Location Consistency) +
(0.20 × Device Integrity) +
(0.15 × Network) +
(0.15 × Behavior)
</pre>

<hr>

<h3>4.4 Decision System</h3>

<ul>
<li>Low → Auto approve</li>
<li>Medium → Soft verification</li>
<li>High → Flag for review</li>
</ul>

<hr>

<h2>5. Database Design (Structured)</h2>

<h4>Users Table</h4>
<ul>
<li>user_id (Primary Key)</li>
<li>platform_type</li>
<li>region_code</li>
<li>risk_score</li>
<li>fraud_score</li>
</ul>

<h4>Policies Table</h4>
<ul>
<li>policy_id</li>
<li>user_id</li>
<li>risk_level</li>
<li>premium_amount</li>
<li>coverage_type</li>
</ul>

<h4>Claims Table</h4>
<ul>
<li>claim_id</li>
<li>user_id</li>
<li>event_type</li>
<li>payout_amount</li>
<li>status</li>
</ul>

<h4>Fraud Logs</h4>
<ul>
<li>log_id</li>
<li>user_id</li>
<li>fraud_score</li>
<li>decision</li>
</ul>

<hr>

<h2>6. API Design (Detailed)</h2>

<p><b>POST /register</b></p>
<ul>
<li>Input: platform_type, region_code</li>
<li>Output: user_id, status</li>
</ul>

<p><b>GET /risk-score</b></p>
<ul>
<li>Input: user_id</li>
<li>Output: risk_score</li>
</ul>

<p><b>POST /buy-policy</b></p>
<ul>
<li>Input: user_id, coverage_type</li>
<li>Output: policy_id</li>
</ul>

<p><b>POST /claim</b></p>
<ul>
<li>Input: user_id, event_type</li>
<li>Output: claim_status</li>
</ul>

<p><b>POST /payout</b></p>
<ul>
<li>Input: claim_id</li>
<li>Output: transaction_status</li>
</ul>

<hr>

<h2>7. Non-Functional Requirements</h2>

<ul>
<li>Response time < 2 seconds</li>
<li>99.9% uptime</li>
<li>AES-256 encryption</li>
<li>Horizontal scalability</li>
</ul>

<hr>

<h2>8. Future Scope</h2>

<ul>
<li>Blockchain-based claims transparency</li>
<li>IoT-based detection</li>
<li>Expansion to ride-sharing platforms</li>
</ul>

<hr>

<h3 align="center">giGuard — Smart Protection for Gig Workers</h3>
