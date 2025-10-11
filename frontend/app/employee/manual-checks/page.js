"use client";
import { useState, useEffect } from "react";
import ReportMap from "../../../components/MapComponent";

export default function CheckWeatherPage() {
  const [userLocation] = useState([18.2677778, 42.3702778]); // Alsoudah default
  const [position, setPosition] = useState(null);
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // 🔹 جلب الطلبات السابقة
  const fetchChecks = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/manual-checks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setChecks(data);
    } catch (err) {
      console.error("❌ Fetch checks error:", err);
    }
  };

  useEffect(() => {
    fetchChecks();
  }, [token]);

  // 🔹 زر الموقع الافتراضي
  const setAlsoudah = () => {
    setPosition([18.2677778, 42.3702778]);
    setMessage(" Using Alsoudah default location");
  };

  // 🔹 تشغيل المودل
  const handleCheckWeather = async () => {
    if (!position) {
      alert("Please select a location on the map first!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/manual-checks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          location: { lat: position[0], lng: position[1] },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(` Model result: ${data.check.modelPrediction}`);
        // بدل الإضافة اليدوية، نعيد تحميل الكل عشان الموقع يطلع مباشرة
        await fetchChecks();
      } else {
        setMessage(" Failed to check weather");
      }
    } catch (err) {
      console.error(" Manual check error:", err);
      setMessage(" Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Manual Weather Check</h2>

      <ReportMap
        userLocation={userLocation}
        position={position}
        setPosition={setPosition}
      />

      <button
        onClick={setAlsoudah}
        style={{
          marginTop: "10px",
          padding: "8px 14px",
          backgroundColor: "#4a6fa5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
         Use Alsoudah Default Location
      </button>

      <br />

      <button
        onClick={handleCheckWeather}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#628665",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Checking..." : "🔍 Run Model Check"}
      </button>

      {message && (
        <p style={{ marginTop: "20px", fontSize: "18px" }}>{message}</p>
      )}

      <hr style={{ margin: "30px 0" }} />

      <h3>Previous Checks</h3>

      {checks.length === 0 ? (
        <p>No previous checks yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "15px",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          {checks.map((c) => (
            <div
              key={c._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                width: "300px",
                textAlign: "left",
                backgroundColor:
                  c.modelPrediction === "High Risk" ? "#ffe6e6" : "#e6ffe6",
              }}
            >
              <p>
                <strong> Location:</strong>{" "}
                {c.weatherData?.location?.lat
                  ? `${c.weatherData.location.lat.toFixed(4)}, ${c.weatherData.location.lng.toFixed(4)}`
                  : "Loading..."}
              </p>
              <p>
                <strong> Date:</strong>{" "}
                {new Date(c.createdAt).toLocaleString()}
              </p>
              <p>
                <strong> Prediction:</strong> {c.modelPrediction}
              </p>
              <button
  onClick={() =>
  window.open(`http://localhost:5000/api/pdf/${c._id}/pdf`, "_blank")
}
  style={{
    marginTop: "10px",
    padding: "6px 12px",
    backgroundColor: "#020303ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  }}
>
   Download PDF
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
