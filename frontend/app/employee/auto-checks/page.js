"use client";
import { useState, useEffect } from "react";

export default function AutoChecksPage() {
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/scheduled-checks")
      .then((res) => res.json())
      .then((data) => {
        setChecks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching scheduled checks:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Automatic Weather Checks (Every 8 Hours)</h2>

      {checks.length === 0 ? (
        <p>No scheduled checks yet.</p>
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
                <strong>📍 Location:</strong>{" "}
                {c.location?.lat.toFixed(4)}, {c.location?.lng.toFixed(4)}
              </p>
              <p>
                <strong>🕓 Checked At:</strong>{" "}
                {new Date(c.executedAt).toLocaleString()}
              </p>
              <p>
                <strong>🔥 Prediction:</strong> {c.modelPrediction}
              </p>
              <button
                onClick={() =>
                  window.open(`http://localhost:5000/api/Pdf/${c._id}/pdf`, "_blank")
                }
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#333",
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
