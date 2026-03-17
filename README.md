<h1 align="center">AI-Powered Parametric Insurance Platform</h1>
<h3 align="center">Software Requirements Specification (SRS)</h3>
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

<p>The system interacts with:</p>

<ul>
<li>Weather APIs</li>
<li>Pollution monitoring APIs</li>
<li>Location services</li>
<li>Payment gateways</li>
<li>AI risk analysis models</li>
</ul>

<p>
When disruption conditions are detected, the system automatically triggers
insurance claims and processes payouts.
</p>

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

<tr>
<th>Component</th>
<th>Technology</th>
</tr>

<tr>
<td>Frontend</td>
<td>Web / Mobile Application</td>
</tr>

<tr>
<td>Backend</td>
<td>Cloud Server</td>
</tr>

<tr>
<td>Database</td>
<td>SQL / NoSQL</td>
</tr>

<tr>
<td>External APIs</td>
<td>Weather API, AQI API, Maps API, Payment API</td>
</tr>

</table>

<hr>

<h2>3. System Features</h2>

<h3>3.1 Worker Registration Module</h3>

<p>
Allows food delivery workers to create accounts and enroll in the insurance platform.
</p>

<p><b>Inputs:</b></p>

<ul>
<li>Phone number</li>
<li>Delivery platform name</li>
<li>Working location</li>
<li>Identity verification</li>
</ul>

<p><b>Outputs:</b></p>

<ul>
<li>Verified worker account</li>
<li>User profile stored in database</li>
</ul>

<hr>

<h3>3.2 AI Risk Assessment Module</h3>

<p>
This module analyzes environmental risks using machine learning models.
</p>

<ul>
<li>Historical weather data</li>
<li>Pollution levels</li>
<li>Flood-prone areas</li>
<li>Disruption frequency</li>
</ul>

<p>The system generates a <b>risk score</b> for each delivery zone.</p>

<hr>

<h3>3.3 Weekly Premium Calculation</h3>

<table border="1" cellpadding="8">

<tr>
<th>Risk Level</th>
<th>Weekly Premium</th>
</tr>

<tr>
<td>Low Risk</td>
<td>₹10</td>
</tr>

<tr>
<td>Medium Risk</td>
<td>₹20</td>
</tr>

<tr>
<td>High Risk</td>
<td>₹35</td>
</tr>

</table>

<hr>

<h3>3.4 Parametric Event Monitoring</h3>

<table border="1" cellpadding="8">

<tr>
<th>Event</th>
<th>Trigger Condition</th>
</tr>

<tr>
<td>Heavy Rain</td>
<td>Rainfall above threshold</td>
</tr>

<tr>
<td>Heatwave</td>
<td>Temperature above safe limit</td>
</tr>

<tr>
<td>Severe Pollution</td>
<td>AQI above critical level</td>
</tr>

<tr>
<td>Curfew</td>
<td>Government movement restrictions</td>
</tr>

</table>

<hr>

<h3>3.5 Automated Claims Processing</h3>

<pre>
Disruption Detected
      ↓
Eligible Workers Identified
      ↓
Claim Generated Automatically
      ↓
Payment Processed
</pre>

<hr>

<h3>3.6 Fraud Detection System</h3>

<ul>
<li>GPS spoofing detection</li>
<li>Duplicate claim detection</li>
<li>False location reporting prevention</li>
</ul>

<hr>

<h3>3.7 Instant Payout System</h3>

<pre>
Average hourly earning = ₹120
Lost working hours = 4

Total payout = ₹480
</pre>

<p>Payments processed using:</p>

<ul>
<li>UPI</li>
<li>Razorpay sandbox</li>
<li>Stripe sandbox</li>
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

<h3>Performance</h3>
<ul>
<li>Real-time disruption detection</li>
<li>Fast claim processing</li>
</ul>

<h3>Security</h3>
<ul>
<li>Encrypted user data</li>
<li>Secure payment gateway integration</li>
<li>Fraud detection mechanisms</li>
</ul>

<h3>Scalability</h3>
<ul>
<li>Support thousands of delivery workers</li>
<li>Operate across multiple cities</li>
</ul>

<h3>Reliability</h3>
<ul>
<li>High availability</li>
<li>Minimal downtime</li>
</ul>

<hr>

<h2>5. System Architecture</h2>

<pre>
Food Delivery Worker App
        │
Backend Server (API Layer)
        │
AI Risk & Fraud Engine
        │
Weather API | AQI API | Location API | Payment API
        │
Parametric Trigger Engine
        │
Automatic Claim Processing
        │
Instant Payout System
</pre>

<hr>

<h2>6. Conclusion</h2>

<p>
The AI-Powered Parametric Insurance Platform provides an innovative solution
to protect food delivery workers from income loss caused by environmental disruptions.
</p>

<p>
By combining <b>AI-driven risk analysis, automated claim triggers, and instant payouts</b>,
the system ensures fast and transparent financial protection for gig economy workers.
</p>

<hr>

<h3 align="center">Protecting the Income of Food Delivery Workers</h3>
