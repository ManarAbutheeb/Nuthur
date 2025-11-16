"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AutoChecksPage() {
  const { t } = useTranslation();
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(true);
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/scheduled-checks`)
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

 if (loading) return <p>{t("loading")}</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
       <h2>{t("title")}</h2>
      {checks.length === 0 ? (
     <p>{t("noChecks")}</p>

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
               <strong> {t("location")}:</strong>{" "}
                {c.location?.lat.toFixed(4)}, {c.location?.lng.toFixed(4)}
              </p>
              <p>
                <strong> {t("checkedAt")}:</strong>{" "}
                {new Date(c.modelCheckedAt).toLocaleString()}
              </p>
              <p>
                <strong> {t("prediction")}:</strong> {c.modelPrediction}
              </p>
              <button
                onClick={() =>
                  window.open(`${BACKEND_URL}/api/Pdf/scheduled/${c._id}/pdf`, "_blank")
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
               {t("downloadPdf")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
