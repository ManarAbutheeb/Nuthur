"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import "../i18n"; // تأكدي أن هذا المسار صحيح حسب مشروعك

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-200 px-8 py-16 text-center">
      <div className="bg-white rounded-3xl shadow-xl p-14 max-w-5xl w-full border border-green-100">
        <h1 className="text-5xl font-extrabold text-green-800 mb-8 tracking-wide">
          {t("aboutUstitle")}
        </h1>

        <p className="text-gray-700 text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
          {t("intro")}
        </p>

        <div className="bg-green-50 rounded-2xl py-10 px-6 mb-10 shadow-inner">
          <ul className="space-y-4 text-green-900 font-semibold text-2xl">
            <li>{t("renad")}</li>
            <li>{t("manar")}</li>
            <li>{t("aryaf")}</li>
            <li>{t("sarah")}</li>
          </ul>
        </div>

        <p className="text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto mb-8">
          {t("project")}
        </p>

        <div className="mt-6">
          <p className="text-green-800 font-semibold text-2xl">
            {t("supervisedBy")}
          </p>
          <p className="text-green-900 font-bold text-2xl mt-2">
            {t("supervisorName")}
          </p>
        </div>
      </div>
    </div>
  );
}
