
"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function SignInPage() {
  const { t } = useTranslation();

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "volunteer" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
       
        setMessage(" The account has been successfully created. Check your email to activate the account.");
      } else {
        setMessage((data.error || "حدث خطأ أثناء التسجيل"));
        setIsError(true);
      }

    } catch (err) {
      setMessage(" حدث خطأ في الخادم، حاول لاحقًا.");
      setIsError(true);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t("Register")}</h1>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t("Name")}</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("Enter name")}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("Email")}</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("Enter email")}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("Password")}</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={t("Enter password")}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("Role")}</label>
          <select className="form-control" name="role" value={form.role} onChange={handleChange}>
            <option value="volunteer">{t("Volunteer")}</option>
            <option value="employee">{t("Employee")}</option>
          </select>
        </div>

        <button type="submit" className="btn btn-danger w-100">{t("Register")}</button>

        {message && (
          <p className={`text-center mt-3 ${isError ? 'text-danger' : 'text-success'}`}>
            {message}
          </p>
        )}

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
