# Energy Anomaly Detector

A full-stack predictive energy anomaly detection system. An ML model (Isolation Forest) flags abnormal energy consumption patterns, integrated into a React dashboard with real-time alerts and trend visualisation.

**Live Demo:** https://energy-anomaly-detector-chi.vercel.app

## What It Does

- Detects energy consumption anomalies across 35,000+ industrial readings
- ML model flags abnormal readings with severity levels (low/medium/high)
- Dashboard shows energy trend chart with anomalies highlighted
- Alert panel lists all flagged anomalies with timestamp and severity
- Admin can mark anomalies as reviewed

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Recharts |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| ML Service | Python, Flask, scikit-learn |
| Deployment | Vercel (frontend), Render (backend) |

## Architecture

## ML Model

- **Algorithm:** Isolation Forest (unsupervised anomaly detection)
- **Dataset:** Steel Industry Energy Consumption (UCI) — 35,040 hourly readings
- **Features:** Usage kWh, hour of day, weekend flag, 3hr/24hr rolling mean, deviation from mean
- **Precision:** ~89% (validated via manual review of flagged anomalies)
- **Anomalies detected:** 1,015 out of 35,040 readings (2.9%)

## Key Results

- Peak consumption detected: 157.18 kWh
- Anomaly spike average: 2.3x normal consumption
- Dataset: Real industrial steel plant energy data

## Running Locally

**Prerequisites:** Node.js, Python 3.9+, MongoDB Atlas account

**1. Clone the repo**
```bash
git clone https://github.com/Ishitasah/energy-anomaly-detector.git
cd energy-anomaly-detector
```

**2. Start ML service**
```bash
cd ml-service
pip install -r requirements.txt
python train_model.py
python app.py
```

**3. Start backend**
```bash
cd backend
npm install
# Add .env file with MONGO_URI and PORT=5000
node server.js
```

**4. Start frontend**
```bash
cd frontend
npm install
# Add .env file with VITE_API_URL=http://localhost:5000
npm run dev
```

## Screenshots

Dashboard with stat cards, energy chart, and anomaly alerts.

## Interview Notes

**Why Isolation Forest?**
Energy anomaly data is unlabelled — you don't have pre-labelled normal/anomalous readings. Isolation Forest is designed for this: it isolates anomalies by randomly partitioning data, and anomalies are easier to isolate because they're rare and different.

**Why this dataset?**
Real industrial energy data with clear patterns (high on weekdays, low at night) making anomalies easy to detect and explain.
