"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
export default function LogInPage() {
   const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});

    const data = await res.json();
if (res.ok) {
  const role = data.user?.role || data.role;

  localStorage.setItem("authToken", data.token);
  localStorage.setItem("userRole", role);
 localStorage.setItem("userName", data.name || data.user?.name || "User");
  localStorage.setItem("userEmail", data.email || data.user?.email || "");
  
  console.log("Login success:", data, "Role:", role);


 if (role === "employee") {
  window.location.href = "/employeeDashboard";
} else {
// window.location.href = "/Volunteer/volunteerDashboard"; // إذا هذه صفحة Next
window.location.href = "/";  
}

} else {
  setError(data.error || "Invalid credentials");
}

  } catch (err) {
    console.error("Full error details:", err);
    setError("Server error, try again later.");
  }
};

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t("Log In")}</h1>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t("Email")}</label>
          <input
            type="email" 
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("Password")}</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger w-100 mb-3" >
          {t("Log In")}
        </button>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="text-center">
          <Link href="/forgot-password" className="text-danger">
              {t("Forgot Password?")}
          </Link>
          
          
        
        </div>
        
      </form>
    </div>
    
  );
}

