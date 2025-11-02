const axios = require("axios");
const WeatherData = require("../models/weatherData");
const FireIndexState = require("../models/FireIndexState");
const CanadianFWI  = require("../utils/fwiCalculator");

async function getLastWeatherIndices() {
  let state = await FireIndexState.findOne({ location: "alsoudah" });
  if (!state) {
    state = await FireIndexState.create({});
  }
  return { ffmc: state.lastFFMC, dmc: state.lastDMC, dc: state.lastDC, state };
}

async function fetchWeatherFromAPI(lat, lng) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,relative_humidity_2m_max,precipitation_sum,windspeed_10m_max&timezone=auto`;
  const res = await axios.get(url);
  const data = res.data;
  return {
    temperature: data.daily.temperature_2m_max[0],
    humidity: data.daily.relative_humidity_2m_max[0],
    windSpeed: data.daily.windspeed_10m_max[0] * 3.6,
    rainfall: data.daily.precipitation_sum[0]
  };
}

async function calculateFWI(weather, lastIndices, date = new Date()) {
  const fwiModel = new CanadianFWI(weather.temperature, weather.humidity, weather.windSpeed, weather.rainfall);
  const month = date.getMonth() + 1;

  const ffmc = fwiModel.FFMCcalc(lastIndices.ffmc);
  const dmc = fwiModel.DMCcalc(lastIndices.dmc, month);
  const dc = fwiModel.DCcalc(lastIndices.dc, month);
  const isi = fwiModel.ISIcalc(ffmc);
  const bui = fwiModel.BUIcalc(dmc, dc);
  const fwi = fwiModel.FWIcalc(isi, bui);

  lastIndices.state.lastFFMC = ffmc;
  lastIndices.state.lastDMC = dmc;
  lastIndices.state.lastDC = dc;
  lastIndices.state.lastUpdate = new Date();
  await lastIndices.state.save();

  return { ffmc, dmc, dc, isi, bui, fwi };
}

async function generateWeatherData(lat, lng, reportId) {
  const weather = await fetchWeatherFromAPI(lat, lng);
  const lastIndices = await getLastWeatherIndices();
  const indices = await calculateFWI(weather, lastIndices);

  const newWeatherData = new WeatherData({
    location: { lat, lng },
    temperature: weather.temperature,
    humidity: weather.humidity,
    windSpeed: weather.windSpeed,
    rainfall: weather.rainfall,
    indices,
    report: reportId
  });

  await newWeatherData.save();
  return newWeatherData;
}

module.exports = { generateWeatherData };
