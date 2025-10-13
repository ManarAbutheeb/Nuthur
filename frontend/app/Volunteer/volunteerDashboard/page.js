"use client";
import { useTranslation } from "react-i18next";

export default function VolunteerDashboard() {
  const { t } = useTranslation();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      justifyContent: "space-between"
    }}>
      
    
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <h1>{t("Welcome, Volunteer!")}</h1>
        <p>{t("Here you can submit your reports to the employee dashboard.")}</p>

        <button
          onClick={() => window.location.href = "/"}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          {t("Submit Report")}
        </button>
      </div>

      {/* Footer في أسفل الصفحة */}
      <footer style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f9fa" }}>
        <p>{t("© 2025 Volunteer Dashboard. All rights reserved.")}</p>
      </footer>
    </div>
  );
}