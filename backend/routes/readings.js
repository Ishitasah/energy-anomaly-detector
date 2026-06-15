const express = require('express')
const router = express.Router()
const axios = require('axios')
const Reading = require('../models/Reading')

router.get('/', async (req, res) => {
  const { start, end } = req.query
  const filter = {}
  if (start && end) {
    filter.timestamp = { $gte: new Date(start), $lte: new Date(end) }
  }
  const readings = await Reading.find(filter).sort({ timestamp: -1 }).limit(500)
  res.json(readings)
})

router.post('/batch', async (req, res) => {
  const { readings } = req.body
  const mlRes = await axios.post('http://localhost:5001/predict', readings)
  const results = mlRes.data
  const docs = results.map(r => ({
    timestamp: r.timestamp,
    usage_kwh: r.usage,
    is_anomaly: r.is_anomaly,
    anomaly_score: r.anomaly_score,
    severity: r.severity
  }))
  await Reading.insertMany(docs)
  res.json({ saved: docs.length, anomalies: results.filter(r => r.is_anomaly).length })
})

module.exports = router