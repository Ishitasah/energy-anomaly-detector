const express = require('express')
const router = express.Router()
const Reading = require('../models/Reading')

router.get('/', async (req, res) => {
  const anomalies = await Reading.find({ is_anomaly: true })
    .sort({ timestamp: -1 })
    .limit(100)
  res.json(anomalies)
})

router.get('/stats', async (req, res) => {
  const total = await Reading.countDocuments()
  const totalAnomalies = await Reading.countDocuments({ is_anomaly: true })
  const highSeverity = await Reading.countDocuments({ severity: 'high' })
  const unreviewed = await Reading.countDocuments({ is_anomaly: true, reviewed: false })
  const topReading = await Reading.findOne().sort({ usage_kwh: -1 })
  res.json({ total, totalAnomalies, highSeverity, unreviewed, peakUsage: topReading?.usage_kwh })
})

router.patch('/:id/review', async (req, res) => {
  await Reading.findByIdAndUpdate(req.params.id, { reviewed: true })
  res.json({ success: true })
})

module.exports = router