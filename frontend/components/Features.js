import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    { title: t("feature1Title"), desc: t("feature1Desc") },
    { title: t("feature2Title"), desc: t("feature2Desc") },
    { title: t("feature3Title"), desc: t("feature3Desc") },
  ];

  return (
    <section 
      id="features" 
      className="py-5"
      style={{
        // backgroundColor: "#f8f9fa", // لون فاتح
        // أو
        background: "linear-gradient(135deg, #e1e4e1ff 0%, #adccb4ff 100%)", // تدرج أخضر
      }}
    >
      <div className="container">
        <h2 className="text-center mb-4">{t("featuresTitle")}</h2>
        <div className="row">
          {features.map((f, idx) => (
            <div className="col-md-4 mb-3" key={idx}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{f.title}</h5>
                  <p className="card-text">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}