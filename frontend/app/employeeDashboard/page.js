"use client";

export default function EmployeeDashboard() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", // يملأ كامل ارتفاع الصفحة
      justifyContent: "space-between"
    }}>
      
      {/* الجزء العلوي - المحتوى الرئيسي */}
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <h1>Welcome, Employee!</h1>
        <button
          onClick={() => window.location.href = "/employeeReport"}
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
          Check Reports
        </button>
      </div>

      {/* Footer في أسفل الصفحة */}
      <footer >
       
      </footer>
    </div>
  );
}
