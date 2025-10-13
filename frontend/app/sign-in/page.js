"use client";
import { useState } from "react";
// أضيفي هذا السطر ↓
import Link from "next/link"; // هذا هو الحل
import { useTranslation } from "react-i18next";

export default function SignInPage() {
  const { t } = useTranslation();

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "volunteer" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false); // هذا هو الحل

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false); // تأكدي من استخدام setIsError هنا أيضًا
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ " + t("Registered successfully!"));
      } else {
        setMessage("❌ " + t("Error:") + " " + data.error);
        setIsError(true);
      }
    } catch (err) {
      setMessage("❌ " + t("Server error:") + " " + err.message);
      setIsError(true);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t("Register")}</h1>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t("Name")}</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} placeholder={t("Enter name")} />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("Email")}</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder={t("Enter email")} />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("Password")}</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} placeholder={t("Enter password")} />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("Role")}</label>
          <select className="form-control" name="role" value={form.role} onChange={handleChange}>
            <option value="volunteer">{t("Volunteer")}</option>
            <option value="employee">{t("Employee")}</option>
          </select>
        </div>
        <button type="submit" className="btn btn-danger w-100">{t("Register")}</button>
        
        {/* رسالة النجاح أو الخطأ (يتغير لونها حسب الحالة) */}
        {message && (
          <p className={`text-center mt-3 ${isError ? 'text-danger' : 'text-success'}`}>
            {message}
          </p>
        )}

        {/* رابط للانتقال إلى صفحة Login إذا كان المستخدم مسجلاً بالفعل */}
        <div className="text-center mt-3">
          <p>
            {t("Already have an account?")}{" "}
            <Link href="/log-in" className="text-danger">
              {t("Log In here")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}