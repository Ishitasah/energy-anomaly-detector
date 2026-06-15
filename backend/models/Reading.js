const mongoose = require('mongoose')

const ReadingSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  usage_kwh: { type: Number, required: true },
  co2: { type: Number },
  power_factor: { type: Number },
  is_anomaly: { type: Boolean, default: false },
  anomaly_score: { type: Number },
  severity: { type: String, enum: ['low','medium','high'], default: 'low' },
  reviewed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Reading', ReadingSchema)