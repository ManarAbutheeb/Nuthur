
const express = require('express');
const axios = require('axios');
const router = express.Router();


const cache = {};
const CACHE_TTL_SECONDS = 60 * 60;


const DEFAULT_LAT = 18.2717;
const DEFAULT_LON = 42.38400;

function buildTipsByWeather(w) {
  const tips = [];
  const temp = Number(w.temperature);     // °C
  const wind = Number(w.windSpeed);       // km/h
  const rh = w.humidity != null ? Number(w.humidity) : null;

  if (temp >= 40) {
    tips.push("High temperature: Avoid any open fire activities outdoors.");
    tips.push("Keep a fire extinguisher nearby when camping.");
  } else if (temp >= 35) {
    tips.push("Extinguish charcoal with water not soil.");
  } else if (temp >= 30) {
    tips.push("Keep fires short and monitored at all times.");
  } else {
    tips.push("Follow standard safety when lighting a fire.");
  }


  if (wind >= 30) {
    tips.push("Strong winds: sparks can travel far. Avoid lighting any fire.");
    tips.push("Stay away from dry grass and exposed areas.");
  } else if (wind >= 15) {
    tips.push("Secure grills and check wind direction before lighting.");
  } else {
    tips.push("Choose a sheltered spot and never leave fire unattended.");
  }


  if (rh !== null && rh < 20) {
    tips.push("Low humidity increases ignitability Exercise extra caution.");
  }


  tips.push("Report any unusual smoke or burning smell immediately.");



  return { tips };
}

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




    const url = `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code` +
      `&wind_speed_unit=kmh&timezone=auto`;

    const response = await axios.get(url);
    const data = response.data;
    const cur = data?.current;
    const hour = new Date().getHours();
    const isDaytime = hour >= 6 && hour < 18;

    const cond = mapWeatherCode(cur.weather_code, isDaytime);

    const result = {
      temperature: Number(cur.temperature_2m),
      condition: cond.main,
      description: cond.description,
      humidity: Number(cur.relative_humidity_2m),
      windSpeed: Number(cur.wind_speed_10m),
      location: data.name || "Al Souda",
      icon: cond.icon,
      timestamp: now
    };

    const advice = buildTipsByWeather(result);

    const full = { ...result, advice, cached: false };


    cache[key] = { ts: now, data: full };

    res.json(full);
  } catch (error) {
    console.error('Error fetching weather data:', error?.message || error);

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
    const advice = buildTipsByWeather(fallback);
    res.json({ ...fallback, advice });

  }
});



function mapWeatherCode(code, isDaytime) {
  const weatherMap = {
    0: { main: 'Clear', description: 'Clear sky', icon: isDaytime ? '☀️' : '🌙' },
    1: { main: 'Mainly clear', description: 'Mainly clear', icon: isDaytime ? '🌤️' : '🌙' },
    2: { main: 'Partly cloudy', description: 'Partly cloudy', icon: isDaytime ? '⛅' : '☁️' },
    3: { main: 'Overcast', description: 'Overcast', icon: '☁️' },
    45: { main: 'Fog', description: 'Fog', icon: '🌫️' },
    48: { main: 'Fog', description: 'Depositing rime fog', icon: '🌫️' },
    51: { main: 'Drizzle', description: 'Light drizzle', icon: '🌦️' },
    53: { main: 'Drizzle', description: 'Moderate drizzle', icon: '🌦️' },
    55: { main: 'Drizzle', description: 'Dense drizzle', icon: '🌦️' },
    61: { main: 'Rain', description: 'Slight rain', icon: '🌧️' },
    63: { main: 'Rain', description: 'Moderate rain', icon: '🌧️' },
    65: { main: 'Rain', description: 'Heavy rain', icon: '🌧️' },
    80: { main: 'Rain showers', description: 'Slight rain showers', icon: '🌦️' },
    81: { main: 'Rain showers', description: 'Moderate rain showers', icon: '🌦️' },
    82: { main: 'Rain showers', description: 'Violent rain showers', icon: '🌧️' },
    71: { main: 'Snow', description: 'Slight snow fall', icon: '❄️' },
    73: { main: 'Snow', description: 'Moderate snow fall', icon: '❄️' },
    75: { main: 'Snow', description: 'Heavy snow fall', icon: '❄️' },
    85: { main: 'Snow showers', description: 'Slight snow showers', icon: '❄️' },
    86: { main: 'Snow showers', description: 'Heavy snow showers', icon: '❄️' },
    95: { main: 'Thunderstorm', description: 'Thunderstorm', icon: '⛈️' },
    96: { main: 'Thunderstorm', description: 'Thunderstorm with slight hail', icon: '⛈️' },
    99: { main: 'Thunderstorm', description: 'Thunderstorm with heavy hail', icon: '⛈️' }
  };

  return weatherMap[code] || { main: 'Unknown', description: '', icon: '' };
}
module.exports = router;
