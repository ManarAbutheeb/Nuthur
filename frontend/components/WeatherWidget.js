"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
const WeatherWidget = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("http://localhost:5000/weatherData/weather/current");
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="weather-widget-loading text-center text-white p-5"
        style={{
          background: "linear-gradient(135deg, #022c13ff 0%, #a8ebc6ff 100%)",
          borderRadius: "20px",
          minHeight: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h5 className="mt-3">{t("Loading weather data...")}</h5>
        <div className="spinner-border text-light mt-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="weather-widget-error text-center text-white p-3"
        style={{
          background: "linear-gradient(135deg, #8f1a1a 0%, #a54a4a 100%)",
          borderRadius: "20px",
          minHeight: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="error-icon mb-3" style={{ fontSize: "3rem" }}></div>
        <h5>Unable to load weather data</h5>
        <p className="mb-0">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="weather-widget text-white position-relative overflow-hidden"
      style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/souda.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "400px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",

      }}
    >
      <div className="p-4 position-relative" style={{ zIndex: 2 }}>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0"></h4>
          <small>{new Date(weatherData.timestamp).toLocaleDateString()}</small>
        </div>

        <div className="row align-items-center">

          <div className="col-md-4 text-center mb-4 mb-md-0">
            <div className="weather-icon mb-2" style={{ fontSize: "4rem", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}>
              {weatherData.icon}
            </div>
            <h1 className="fw-bold display-4 mb-1">{weatherData.temperature}°C</h1>
            <p className="fs-5 mb-2">{weatherData.condition}</p>
            <div className="location-badge d-inline-block px-3 py-1 rounded-pill"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
              <h6>{t("Al Soudah - Abha")}</h6>
            </div>
          </div>


          <div className="col-md-8">
            <div className="row text-center">
              <div className="col-6 col-md-3 mb-3">
                <div className="weather-detail-card p-3 rounded-3 h-100"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <div className="detail-icon mb-2" style={{ fontSize: "1.8rem" }}>💧</div>
                  <h6>{t("Humidity")}</h6>
                  <p className="fs-5 fw-bold mb-0">{weatherData.humidity}%</p>
                </div>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <div className="weather-detail-card p-3 rounded-3 h-100"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <div className="detail-icon mb-2" style={{ fontSize: "1.8rem" }}>🌫️</div>
                  <h6>{t("Wind Speed")}</h6>
                  <p className="fs-5 fw-bold mb-0">{weatherData.windSpeed} km/h</p>
                </div>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <div className="weather-detail-card p-3 rounded-3 h-100"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <div className="detail-icon mb-2" style={{ fontSize: "1.8rem" }}>☁️</div>
                  <h6>{t("Condition")}</h6>
                  <p className="fs-5 fw-bold mb-0">{weatherData.description}</p>
                </div>
              </div>


            </div>
            <div className="col-9">
              <div className="mt-2 p-3 rounded-3"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", borderLeft: "5px solid #ffeb3b" }}>
                <h6 className="mb-2">{t("Safety Tips")}</h6>
                {Array.isArray(weatherData?.advice?.tips) && weatherData.advice.tips.length > 0 ? (
                  <ul className="mb-0 ps-3">
                    {weatherData.advice.tips.map((tip, idx) => (
                      <li key={idx} className="mb-1">{t(tip)}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mb-0">{t("No tips available.")}</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="weather-footer text-center py-4"
        style={{ backgroundColor: "rgba(0,0,0,0.3)", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
        <small> {new Date(weatherData.timestamp).toLocaleTimeString()} {t("Updated")}  </small>
      </div>

    </div>
  );
};
export default WeatherWidget;