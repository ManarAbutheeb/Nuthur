"use client";
import WeatherWidget from "../../components/WeatherWidget";

export default function EmployeeDashboard() {


  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", // يملأ كامل ارتفاع الصفحة
      justifyContent: "space-between"
    }}>

 <WeatherWidget />
      {/* الجزء العلوي - المحتوى الرئيسي */}
      <div style={{ textAlign: "center" }}>
        <h1>Welcome Back, Employee!</h1>
        <button
          onClick={() => window.location.href = "/employee/reports"}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#628665ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          Check Reports
        </button>
      </div>


      <footer >
       
      </footer>
    </div>
  );
}
