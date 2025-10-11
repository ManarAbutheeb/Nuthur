// backend/routes/weatherRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();


const cache = {};
const CACHE_TTL_SECONDS = 60 * 60; // 1 hour


const DEFAULT_LAT = 18.2717;
const DEFAULT_LON = 42.38400;

router.get('/weather/current', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat) || DEFAULT_LAT;
    const lon = parseFloat(req.query.lng) || DEFAULT_LON;
    const key = `${lat},${lon}`;

    // return cached if fresh
    const cached = cache[key];
    const now = Date.now();
    if (cached && (now - cached.ts) / 1000 < CACHE_TTL_SECONDS) {
      return res.json({ ...cached.data, cached: true, cachedAt: cached.ts });
    }

    // Build OpenWeather API URL
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      console.error("Missing WEATHER_API_KEY in .env");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    const result = {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // m/s -> km/h
      location: data.name || "Al Souda",
      icon: getWeatherIcon(data.weather[0].icon),
      timestamp: now
    };

    // cache it
    cache[key] = { ts: now, data: result };

    res.json({ ...result, cached: false });
  } catch (error) {
    console.error('Error fetching weather data:', error?.message || error);
    // fallback static data
    const fallback = {
      temperature: 18,
      condition: "Partly Cloudy",
      description: "partly cloudy",
      humidity: 65,
      windSpeed: 8,
      location: "Al Souda, Aseer",
      icon: "⛅",
      timestamp: Date.now(),
      cached: false,
      error: "fallback"
    };
    res.json(fallback);
  }
});

// convert OpenWeather icon code to emoji (simple map)
function getWeatherIcon(iconCode) {
  const iconMap = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '⛅',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌦️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };
  return iconMap[iconCode] || '🌡️';
}

module.exports = router;
