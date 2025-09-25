"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  // State للبيانات
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // State لإدارة الخطوة الحالية (1, 2, 3)
  const [currentStep, setCurrentStep] = useState(1); // 1: إدخال الإيميل, 2: إدخال الرمز, 3: إدخال الباسوورد الجديد

  // 1. دالة إرسال الرمز
  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ " + data.message);
        setIsError(false);
        setCurrentStep(2); // انتقل للخطوة 2 (إدخال الرمز)
      } else {
        setMessage("❌ " + data.error);
        setIsError(true);
      }
    } catch (err) {
      setMessage("❌ خطأ في الشبكة");
      setIsError(true);
    }
  };

  // 2. دالة التحقق من الرمز
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ " + data.message);
        setIsError(false);
        setCurrentStep(3); // انتقل للخطوة 3 (إدخال كلمة السر الجديدة)
      } else {
        setMessage("❌ " + data.error);
        setIsError(true);
      }
    } catch (err) {
      setMessage("❌ خطأ في الشبكة");
      setIsError(true);
    }
  };

  // 3. دالة تعيين كلمة المرور الجديدة
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ " + data.message);
        setIsError(false);
        // يمكن توجيه المستخدم إلى صفحة الدخول هنا
        // window.location.href = "/login";
      } else {
        setMessage("❌ " + data.error);
        setIsError(true);
      }
    } catch (err) {
      setMessage("❌ خطأ في الشبكة");
      setIsError(true);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Reset password</h1>

      {/* الخطوة 1: إدخال الإيميل */}
      {currentStep === 1 && (
        <form onSubmit={handleSendCode} className="w-50 mx-auto">
          <p>Enter you email address</p>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="your.email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">
            submit
          </button>
        </form>
      )}

      {/* الخطوة 2: إدخال الرمز */}
      {currentStep === 2 && (
        <form onSubmit={handleVerifyCode} className="w-50 mx-auto">
          <p>Enter the code you recevied</p>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="******"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">
           Verify
          </button>
        </form>
      )}

      {/* الخطوة 3: إدخال كلمة المرور الجديدة */}
      {currentStep === 3 && (
        <form onSubmit={handleResetPassword} className="w-50 mx-auto">
          <p>Enter your new password</p>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">
          Submit
          </button>
        </form>
      )}

      {/* عرض الرسائل */}
      {message && (
        <div className={`mt-3 text-center ${isError ? 'text-danger' : 'text-success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}