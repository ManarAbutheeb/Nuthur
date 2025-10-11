"use client";

export default function VolunteerDashboard() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      justifyContent: "space-between"
    }}>
      
      {/* الجزء العلوي - المحتوى الرئيسي */}
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <h1>Welcome, Volunteer!</h1>
        <p>Here you can submit your reports to the employee dashboard.</p>

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
          Submit Report
        </button>
      </div>

      {/* Footer في أسفل الصفحة */}
      <footer >
       
      </footer>
    </div>
  );
}
