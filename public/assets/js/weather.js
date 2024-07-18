// Get the search button
const searchButton = document.getElementById('searchButton')

// Listen for a click event on the search button
searchButton.addEventListener('click', function () {
  // Get the value of the location input
  const city = document.getElementById('locationInput').value

  if (city) {
    // Call the getWeather function with the city
    getWeather(city)
  } else {
    alert('Please enter a city name.')
  }
})

// If no city is provided, fetch weather for 'Toulon' by default
getWeather('Toulon')

// Asynchronous function to get weather information
async function getWeather(city) {
  const apiUrl = '/weather'

  // Get elements to display weather information
  const locationElement = document.getElementById('location')
  const temperatureElement = document.getElementById('temperature')
  const weatherIconElement = document.getElementById('weatherIcon')
  const descriptionElement = document.getElementById('description')
  const humidityElement = document.getElementById('humidity')

  try {
    // Fetch weather data from the proxy API route
    const response = await fetch(`${apiUrl}?q=${city}`)
    if (!response.ok) {
      throw new Error('Weather data not available')
    }
    const data = await response.json()

    // Extract weather information
    const temperature = Math.round(data.main.temp)
    const humidity = data.main.humidity
    const weatherDescription = data.weather[0].description
    const weatherId = data.weather[0].id

    // Display basic weather information
    locationElement.textContent = data.name
    temperatureElement.textContent = `${temperature}°C`
    descriptionElement.textContent = weatherDescription
    humidityElement.textContent = `${humidity}%`

    // Determine the weather icon to display
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

    // Match weather condition to corresponding icon
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
      } else if (weatherId === 731 || (weatherId >= 751 && weatherId <= 761)) {
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

    // Display the weather icon
    weatherIconElement.src = weatherIcon
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
}
