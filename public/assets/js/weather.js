document.addEventListener('DOMContentLoaded', (event) => {
  const searchButton = document.getElementById('searchButton')

  searchButton.addEventListener('click', function () {
    const city = document.getElementById('locationInput').value
    if (city) {
      fetchApiKey()
        .then((apiKey) => getWeather(city, apiKey))
        .catch((error) => console.error('Error fetching the API key:', error))
    } else {
      alert('Please enter a city name.')
    }
  })

  fetchApiKey()
    .then((apiKey) => getWeather('Toulon', apiKey))
    .catch((error) => console.error('Error fetching the API key:', error))

  async function fetchApiKey() {
    const response = await fetch('/api-key')
    const data = await response.json()
    return data.apiKey
  }

  async function getWeather(city, apiKey) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

    const locationElement = document.getElementById('location')
    const temperatureElement = document.getElementById('temperature')
    const weatherIconElement = document.getElementById('weatherIcon')
    const descriptionElement = document.getElementById('description')
    const humidityElement = document.getElementById('humidity')

    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Weather data not available')
      }
      const data = await response.json()

      // Extraction des informations météo
      const temperature = Math.round(data.main.temp)
      const humidity = data.main.humidity
      const weatherDescription = data.weather[0].description
      const weatherId = data.weather[0].id

      // Affichage des informations de base
      locationElement.textContent = data.name
      temperatureElement.textContent = `${temperature}°C`
      descriptionElement.textContent = weatherDescription
      humidityElement.textContent = `${humidity}%`

      // Détermination de l'icône météo à afficher
      let weatherIcon = ''
      const weatherIcons = {
        thunderstorm: './assets/icons/thunderstorm.png',
        drizzle: './assets/icons/drizzle.png',
        rain: './assets/icons/rain.png',
        snow: './assets/icons/snow.png',
        clear: './assets/icons/clear.png',
        clouds: './assets/icons/clouds.png',
        mist: './assets/icons/mist.png',
        dust: './assets/icons/dust.png',
        ash: './assets/icons/ash.png',
        squall: './assets/icons/squall.png',
        tornado: './assets/icons/tornado.png',
        unknown: './assets/icons/unknown.png',
      }

      if (weatherId >= 200 && weatherId <= 232) {
        weatherIcon = weatherIcons.thunderstorm
      } else if (weatherId >= 300 && weatherId <= 321) {
        weatherIcon = weatherIcons.drizzle
      } else if (weatherId >= 500 && weatherId <= 531) {
        weatherIcon = weatherIcons.rain
      } else if (weatherId >= 600 && weatherId <= 622) {
        weatherIcon = weatherIcons.snow
      } else if (weatherId === 800) {
        weatherIcon = weatherIcons.clear
      } else if (weatherId >= 801 && weatherId <= 804) {
        weatherIcon = weatherIcons.clouds
      } else if (weatherId >= 701 && weatherId <= 781) {
        if (
          weatherId === 701 ||
          (weatherId >= 711 && weatherId <= 721) ||
          weatherId === 741
        ) {
          weatherIcon = weatherIcons.mist
        } else if (
          weatherId === 731 ||
          (weatherId >= 751 && weatherId <= 761)
        ) {
          weatherIcon = weatherIcons.dust
        } else if (weatherId === 762) {
          weatherIcon = weatherIcons.ash
        } else if (weatherId === 771) {
          weatherIcon = weatherIcons.squall
        } else if (weatherId === 781) {
          weatherIcon = weatherIcons.tornado
        }
      } else {
        weatherIcon = weatherIcons.unknown
      }

      // Affichage de l'icône météo
      weatherIconElement.src = weatherIcon
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }
})
