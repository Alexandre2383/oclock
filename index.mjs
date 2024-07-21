import 'dotenv/config'
import express from 'express'
import path from 'path'
import fetch from 'node-fetch'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 4000

// Utilisation du middleware d'express pour servir le chemin du module et du dossier public
app.use(express.static(path.join(__dirname, 'public')))

// Endpoint proxy pour l'API météo
app.get('/weather', async (req, res) => {
  const { q } = req.query
  const apiKey = process.env.WEATHER_API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}&units=metric`

  try {
    // Envoi d'une requête vers l'API météo en fonction de l'url construite
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Weather data not available')
    }
    // Extraction et préparation des données JSON à partir de la réponse
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération des données météo' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
