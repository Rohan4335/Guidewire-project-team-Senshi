<h1 align="center">giGuard</h1>
<h3 align="center">AI-Powered Parametric Insurance Platform</h3>
<h4 align="center">Software Requirements Specification (SRS)</h4>
<h4 align="center">For Food Delivery Workers (Swiggy / Zomato / Blinkit)</h4>

<hr>

<h2>1. Introduction</h2>

<h3>1.1 Purpose</h3>
<p>
This document provides the <b>Software Requirements Specification (SRS)</b> for the
AI-Powered Parametric Insurance Platform designed to protect <b>food delivery workers</b>
from income loss caused by external disruptions such as extreme weather, pollution,
or government restrictions.
</p>

<p>The goal of the system is to:</p>

<ul>
<li>Provide income protection for gig workers</li>
<li>Detect disruption events automatically</li>
<li>Use AI-based risk assessment for premium calculation</li>
<li>Trigger automated insurance claims</li>
<li>Provide instant payouts</li>
<li>Prevent fraudulent claims</li>
</ul>

<hr>

<h3>1.2 Scope</h3>

<p>
The proposed system is an <b>AI-powered parametric insurance platform</b>
designed specifically for food delivery workers working on platforms such as:
</p>

<ul>
<li>Swiggy</li>
<li>Zomato</li>
<li>Blinkit</li>
<li>Zepto</li>
</ul>

<p>
Food delivery workers depend on daily deliveries for income. External disruptions
such as heavy rain, heatwaves, pollution, or curfews may prevent them from working.
The system compensates workers for income lost during such disruptions.
</p>

<p><b>Key features include:</b></p>

<ul>
<li>Worker registration and onboarding</li>
<li>AI-based risk assessment</li>
<li>Weekly premium calculation</li>
<li>Parametric disruption monitoring</li>
<li>Automatic claim generation</li>
<li>Fraud detection system</li>
<li>Instant payout processing</li>
<li>Worker and admin dashboards</li>
</ul>

<p><b>Coverage Limitations:</b></p>

<ul>
<li>Health insurance is not included</li>
<li>Accident insurance is not included</li>
<li>Vehicle repair coverage is not included</li>
</ul>

<hr>

<h3>1.3 Definitions, Acronyms, and Abbreviations</h3>

<table border="1" cellpadding="8">
<tr>
<th>Term</th>
<th>Description</th>
</tr>

<tr>
<td>SRS</td>
<td>Software Requirements Specification</td>
</tr>

<tr>
<td>AI</td>
<td>Artificial Intelligence</td>
</tr>

<tr>
<td>Gig Worker</td>
<td>Worker paid per task or delivery</td>
</tr>

<tr>
<td>Parametric Insurance</td>
<td>Insurance triggered automatically when predefined conditions occur</td>
</tr>

<tr>
<td>Disruption Event</td>
<td>External event preventing delivery work</td>
</tr>

<tr>
<td>AQI</td>
<td>Air Quality Index</td>
</tr>

</table>

<hr>

<h3>1.4 References</h3>

<ul>
<li>IEEE 830 Software Requirements Specification Standard</li>
<li>IEEE 29148 Systems and Software Engineering Requirements Standard</li>
<li>Gig Economy Research Reports</li>
<li>Weather and Environmental Monitoring APIs</li>
</ul>

<hr>

<h2>2. Overall Description</h2>

<h3>2.1 Product Perspective</h3>

<p>
The proposed system is a <b>cloud-based web/mobile platform</b>
that integrates with external data sources to detect disruption events affecting
food delivery workers.
</p>

<ul>
<li>Weather APIs</li>
<li>Pollution monitoring APIs</li>
<li>Location services</li>
<li>Payment gateways</li>
<li>AI risk analysis models / scoring system</li>
</ul>

<hr>

<h3>2.2 Product Functions</h3>

<ol>
<li>Worker registration and verification</li>
<li>AI-based risk profiling</li>
<li>Weekly insurance premium calculation</li>
<li>Insurance policy management</li>
<li>Real-time disruption monitoring</li>
<li>Automated claim generation</li>
<li>Fraud detection</li>
<li>Instant payout processing</li>
<li>Worker and admin dashboards</li>
</ol>

<hr>

<h3>2.3 User Classes and Characteristics</h3>

<h4>Food Delivery Workers (Primary Users)</h4>

<ul>
<li>Work on gig-based delivery platforms</li>
<li>Income depends on number of deliveries</li>
<li>Affected by environmental disruptions</li>
</ul>

<p><b>Responsibilities:</b></p>

<ul>
<li>Register on the platform</li>
<li>Purchase weekly insurance coverage</li>
<li>Receive automatic compensation during disruptions</li>
</ul>

<h4>Insurance Administrator</h4>

<ul>
<li>Monitor policies</li>
<li>Analyze disruption data</li>
<li>Detect fraud</li>
<li>Manage claims and payouts</li>
</ul>

<hr>

<h3>2.4 Operating Environment</h3>

<table border="1" cellpadding="8">
<tr><th>Component</th><th>Technology</th></tr>
<tr><td>Frontend</td><td>Web / Mobile Application</td></tr>
<tr><td>Backend</td><td>Cloud Server</td></tr>
<tr><td>Database</td><td>SQL / NoSQL</td></tr>
<tr><td>External APIs</td><td>Weather API, AQI API, Maps API, Payment API</td></tr>
</table>

<hr>

<h2>3. System Features</h2>

<h3>3.1 Worker Registration Module</h3>

<ul>
<li>Phone number</li>
<li>Delivery platform name</li>
<li>Working location</li>
<li>Identity verification</li>
</ul>

<hr>

<h3>3.2 AI Risk Assessment Module </h3>

<p><b>Inputs:</b></p>
<ul>
<li>Weather data (rain, heat, storms)</li>
<li>Location (urban / highway / risk zones)</li>
<li>Time (night = higher risk)</li>
<li>Delivery frequency (fatigue factor)</li>
<li>Historical data (if available)</li>
</ul>

<p><b>Model Approach:</b></p>
<ul>
<li>Pre-trained models / APIs OR weighted scoring system</li>
</ul>

<p><b>Risk Score:</b></p>

<pre>
Risk Score =
(0.30 × Weather Risk) +
(0.25 × Location Risk) +
(0.20 × Time Risk) +
(0.15 × Delivery Load) +
(0.10 × User History)
</pre>

<ul>
<li>Low Risk (0–30)</li>
<li>Medium Risk (31–70)</li>
<li>High Risk (71–100)</li>
</ul>

<hr>

<h3>3.3 Weekly Premium Calculation (Enhanced)</h3>

<pre>
Premium = Base Price × Risk Multiplier × Coverage Factor
</pre>

<ul>
<li>Base Price = ₹50/day</li>
<li>Risk Multiplier: Low(1.0), Medium(1.5), High(2.2)</li>
<li>Coverage Factor: Basic(1.0), Premium(1.8)</li>
</ul>

<table border="1" cellpadding="8">
<tr><th>Risk</th><th>Basic</th><th>Premium</th></tr>
<tr><td>Low</td><td>₹50</td><td>₹90</td></tr>
<tr><td>Medium</td><td>₹75</td><td>₹135</td></tr>
<tr><td>High</td><td>₹110</td><td>₹198</td></tr>
</table>

<hr>

<h3>3.4 Parametric Event Monitoring</h3>

<table border="1" cellpadding="8">
<tr><th>Event</th><th>Trigger Condition</th></tr>
<tr><td>Heavy Rain</td><td>Rainfall > 50mm</td></tr>
<tr><td>Heatwave</td><td>Temperature > 45°C</td></tr>
<tr><td>Severe Pollution</td><td>AQI above critical level</td></tr>
<tr><td>Curfew</td><td>Government restrictions</td></tr>
</table>

<hr>

<h3>3.5 Automated Claims Processing (Enhanced)</h3>

<pre>
IF rainfall > 50mm AND worker is active
→ Claim auto-triggered
</pre>

<pre>
Monitoring → Condition Match → Claim Generated → Payout Initiated
</pre>

<hr>

<h3>3.6 Fraud Detection System</h3>

<ul>
<li>GPS spoofing detection</li>
<li>Duplicate claim detection</li>
<li>False location reporting prevention</li>
</ul>

<hr>

<h3>3.7 Instant Payout System (Enhanced)</h3>

<pre>
Payout = Fixed Amount × Severity Factor
</pre>

<table border="1" cellpadding="8">
<tr><th>Condition</th><th>Severity</th><th>Payout</th></tr>
<tr><td>Light Rain</td><td>Low</td><td>₹100</td></tr>
<tr><td>Heavy Rain</td><td>Medium</td><td>₹300</td></tr>
<tr><td>Extreme Weather</td><td>High</td><td>₹700</td></tr>
</table>

<pre>
Detect → Trigger → Calculate → Transfer
</pre>

<ul>
<li>UPI</li>
<li>Razorpay</li>
<li>Stripe</li>
</ul>

<hr>

<h3>3.8 Dashboard System</h3>

<h4>Worker Dashboard</h4>
<ul>
<li>Active insurance coverage</li>
<li>Weekly premium details</li>
<li>Claim history</li>
<li>Payout records</li>
</ul>

<h4>Admin Dashboard</h4>
<ul>
<li>Policy statistics</li>
<li>Claim analytics</li>
<li>Fraud alerts</li>
<li>Disruption monitoring</li>
</ul>

<hr>

<h2>4. Non-Functional Requirements</h2>

<ul>
<li>Real-time disruption detection</li>
<li>Fast claim processing</li>
<li>Encrypted user data</li>
<li>Secure payment gateways</li>
<li>Scalable system</li>
<li>High availability</li>
</ul>

<hr>

<h2>5. System Architecture</h2>

<pre>
Food Delivery Worker App
        │
Backend Server (API Layer)
        │
Risk Engine
        │
External APIs
        │
Trigger Engine
        │
Claim Processing
        │
Payout System
</pre>

<hr>

<h2>6. Conclusion</h2>

<p>
giGuard provides a <b>realistic, automated, and scalable insurance solution</b>
for gig workers using parametric triggers and AI-assisted risk analysis.
</p>

<hr>

<h2>7. Use Case Diagram</h2>

<pre>
Actors:
- Worker
- Admin

Use Cases:
- Register/Login
- Buy Insurance
- View Risk Score
- Receive Claim
- View Payout
- Admin Monitoring
- Fraud Detection
</pre>

<hr>

<h2>8. System Workflow</h2>

<pre>
User Active
   ↓
System Monitors Data
   ↓
Condition Triggered
   ↓
Claim Generated
   ↓
Payout Calculated
   ↓
Money Transferred
</pre>

<hr>

<h2>9. Database Design</h2>

<h4>Users</h4>
<ul>
<li>UserID</li>
<li>Name</li>
<li>Phone</li>
<li>Platform</li>
<li>Location</li>
</ul>

<h4>Policies</h4>
<ul>
<li>PolicyID</li>
<li>UserID</li>
<li>Risk Level</li>
<li>Premium</li>
<li>Coverage</li>
</ul>

<h4>Claims</h4>
<ul>
<li>ClaimID</li>
<li>UserID</li>
<li>Event</li>
<li>Payout</li>
<li>Status</li>
</ul>

<hr>

<h2>10. API Design</h2>

<ul>
<li>POST /register</li>
<li>POST /login</li>
<li>GET /risk-score</li>
<li>POST /buy-policy</li>
<li>GET /claims</li>
<li>POST /trigger-claim</li>
<li>POST /payout</li>
</ul>

<hr>

<h2>11. Security Measures</h2>

<ul>
<li>JWT Authentication</li>
<li>Encrypted data</li>
<li>Secure payments</li>
<li>Fraud detection</li>
</ul>

<hr>

<h2>12. Future Scope</h2>

<ul>
<li>Integration with Swiggy/Zomato APIs</li>
<li>Blockchain transparency</li>
<li>IoT accident detection</li>
<li>Mobile app</li>
<li>Expansion to Uber/Rapido</li>
</ul>

<hr>

<h3 align="center">Protecting the Income of Food Delivery Workers</h3>
