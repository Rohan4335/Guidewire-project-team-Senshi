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
<li>Extreme temperature conditions (heatwaves & cold waves)</li>
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
<tr><td>Confidence Score</td><td>Reliability of collected data (0–100)</td></tr>
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
<li>Risk Multiplier = Low(1.0), Medium(1.5), High(2.2)</li>
<li>Coverage = Basic(1.0), Premium(1.8)</li>
</ul>

<p><b>Example:</b></p>
<pre>
Premium = 50 × 1.5 × 1.8 = ₹135/day
</pre>

<hr>

<h3>3.4 Event Monitoring</h3>

<table border="1">
<tr><th>Event</th><th>Threshold</th></tr>
<tr><td>Heavy Rain</td><td>> 50mm</td></tr>
<tr><td>Heatwave</td><td>> 45°C</td></tr>
<tr><td>Cold Wave</td><td>< -1°C</td></tr>
<tr><td>Severe Pollution</td><td>AQI > 300</td></tr>
</table>

<p><b>Note:</b> All environmental data must be real-time (&lt; 5 minutes old).</p>

<hr>

<h3>3.5 Claim Logic</h3>

<pre>
IF (event_triggered == TRUE)
AND (user_active == TRUE)
AND (fraud_score < 60)
AND (confidence_score > 50)
→ APPROVE CLAIM
</pre>

<p><b>Fallback Rule:</b> If data is incomplete, delay claim instead of rejecting.</p>

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
Fraud + Confidence Check
   ↓
Decision Engine
   ↓
Payout Transfer
</pre>

<hr>

<h2>4. Adversarial Defense & Anti-Spoofing Strategy</h2>

<h3>4.1 Multi-Layer Location Verification</h3>

<ul>
<li>GPS + Accelerometer + Gyroscope validation</li>
<li>Device integrity checks (Play Integrity API / DeviceCheck)</li>
<li>IP-based geolocation verification</li>
</ul>

<h3>4.2 Behavioral Anomaly Detection</h3>

<ul>
<li>Movement pattern tracking</li>
<li>Claim frequency monitoring</li>
<li>Inactivity detection during movement</li>
</ul>

<h3>4.3 Fraud Ring Detection</h3>

<ul>
<li>Cluster detection (same location/time)</li>
<li>Shared network/device patterns</li>
<li>Graph-based anomaly detection</li>
</ul>

<h3>4.4 Device Fingerprinting</h3>

<ul>
<li>Unique non-PII device ID</li>
<li>Detect multiple accounts on same device</li>
<li>Detect emulator/virtual environments</li>
</ul>

<h3>4.5 Session & Activity Monitoring</h3>

<ul>
<li>Foreground/background app state</li>
<li>User interaction patterns</li>
<li>Session continuity validation</li>
</ul>

<h3>4.6 Time Synchronization Check</h3>

<ul>
<li>Compare device time with server time</li>
<li>Detect time manipulation</li>
</ul>

<h3>4.7 Rate Limiting</h3>

<ul>
<li>Maximum 2 claims per day</li>
<li>Cooldown period: 6 hours</li>
</ul>

<h3>4.8 Fraud Score</h3>

<pre>
Fraud Score =
(0.30 × Movement Anomaly) +
(0.20 × Location Consistency) +
(0.20 × Device Integrity) +
(0.15 × Network Signals) +
(0.15 × Behavior Pattern)
</pre>

<h3>4.9 Confidence Score</h3>

<ul>
<li>GPS accuracy</li>
<li>Sensor availability</li>
<li>Network reliability</li>
</ul>

<h3>4.10 Decision System</h3>

<ul>
<li>Low Risk → Instant payout</li>
<li>Medium Risk → Delayed verification</li>
<li>High Risk → Manual review</li>
</ul>

<h3>4.11 Fallback Mechanisms</h3>

<ul>
<li>Use historical trust score if sensors fail</li>
<li>Allow delayed verification for network issues</li>
<li>Do not auto-reject due to missing data</li>
</ul>

<h3>4.12 Explainability</h3>

<ul>
<li>Provide reasons for claim decisions</li>
<li>Example: "No movement detected + High fraud score"</li>
</ul>

<h3>4.13 Audit Logging</h3>

<ul>
<li>Store all claim decisions</li>
<li>Log fraud reasoning</li>
<li>Maintain traceability</li>
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
<li>confidence_score</li>
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
<li>reason</li>
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
