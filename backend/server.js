const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

app.use('/api/readings', require('./routes/readings'))
app.use('/api/anomalies', require('./routes/anomalies'))

app.listen(process.env.PORT || 5000, () => {
  console.log('Backend running on port 5000')
})