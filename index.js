require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.WEATHER_API })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
