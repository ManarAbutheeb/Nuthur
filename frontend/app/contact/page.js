"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export default function ContactPage() {
    const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
       setStatus(t("messageSent"));
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(t("messageFailed"));
      }
    } catch (err) {
      console.error("Error sending message:", err);
       setStatus(t("serverError"));
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>{t("contactUs")}</h2>
      <p>{t("contactDescription")}</p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          margin: "30px auto",
          gap: "12px",
        }}
      >
        <input
          type="text"
         placeholder={t("yourName")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="email"
           placeholder={t("yourEmail")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
            placeholder={t("yourMessage")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        ></textarea>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#041f08ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
           {t("sendMessage")}
        </button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}
