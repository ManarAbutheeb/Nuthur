import React from "react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      className="text-center d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#ffffffff",
        color: "#041609ff",
        height: "100vh",
        marginTop: "-200px"
      }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold">{t("heroTitle")}</h1>
        <p className="lead mt-3">{t("heroDesc")}</p>
      
        <a
          href="Volunteer/reportForm"
          className="btn btn-danger btn-lg mt-3"
          style={{ backgroundColor: "#680707ff" }}
        >
          {t("createReport")}
        </a>
        <p></p>
        <a
          href="#features"
          className="btn btn-danger btn-lg"
          style={{ backgroundColor: "#680707ff" }}
        >
          {t("discoverFeatures")}
        </a>
      </div>
    </section>
  );
}
