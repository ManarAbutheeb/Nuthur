"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();


  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);


  const [currentStep, setCurrentStep] = useState(1); 


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
        setMessage( data.message);
        setIsError(false);
        setCurrentStep(2); 
      } else {
        setMessage( data.error);
        setIsError(true);
      }
    } catch (err) {
      setMessage( t("Network Error"));
      setIsError(true);
    }
  };


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
        setMessage( data.message);
        setIsError(false);
        setCurrentStep(3); 
      } else {
        setMessage( data.error);
        setIsError(true);
      }
    } catch (err) {
      setMessage( t("Network Error"));
      setIsError(true);
    }
  };


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
        setMessage( data.message);
        setIsError(false);
     
      } else {
        setMessage(data.error);
        setIsError(true);
      }
    } catch (err) {
      setMessage( t("Network Error"));
      setIsError(true);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t("Reset password")}</h1>


      {currentStep === 1 && (
        <form onSubmit={handleSendCode} className="w-50 mx-auto">
          <p>{t("Enter your email address")}</p>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder={t("your.email@gmail.com")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">
            {t("Submit")}
          </button>
        </form>
      )}

   
      {currentStep === 2 && (
        <form onSubmit={handleVerifyCode} className="w-50 mx-auto">
          <p>{t("Enter the code you received")}</p>
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
            {t("Verify")}
          </button>
        </form>
      )}

     
      {currentStep === 3 && (
        <form onSubmit={handleResetPassword} className="w-50 mx-auto">
          <p>{t("Enter your new password")}</p>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder={t("your new password")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">
            {t("Submit")}
          </button>
        </form>
      )}

  
      {message && (
        <div className={`mt-3 text-center ${isError ? 'text-danger' : 'text-success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}