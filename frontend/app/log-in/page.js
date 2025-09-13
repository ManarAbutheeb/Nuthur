"use client";
import { useState } from "react";
import Link from "next/link";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // يمنع إعادة تحميل الصفحة
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ تسجيل الدخول نجح
        console.log("Login success:", data);
        window.location.href = "/"; // يوديه للصفحة الرئيسية
      } else {
        // ❌ خطأ
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error, try again later.");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Log In</h1>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label"> Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-danger w-100 mb-3">
          Log In
        </button>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="text-center">
          <Link href="/forgot-password" className="text-danger">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

