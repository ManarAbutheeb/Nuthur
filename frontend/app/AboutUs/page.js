import React from "react";

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-200 px-8 py-16 text-center">
      <div className="bg-white rounded-3xl shadow-xl p-14 max-w-5xl w-full border border-green-100">
        <h1 className="text-5xl font-extrabold text-green-800 mb-8 tracking-wide">
          About Us
        </h1>

        <p className="text-gray-700 text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
          We are students from Imam Mohammad Ibn Saud Islamic University.
        </p>

        <div className="bg-green-50 rounded-2xl py-10 px-6 mb-10 shadow-inner">
          <ul className="space-y-4 text-green-900 font-semibold text-2xl">
            <li>Renad Abdullah Salem Altoum</li>
            <li>Manar Mohammed Abdullah Abutheeb</li>
            <li>Aryaf Fayez Monef Alotaibi</li>
            <li>Sarah Mohammed Alowjan</li>
          </ul>
        </div>

        <p className="text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto mb-8">
          This project was developed to support and protect the environment.
          It represents our graduation project created with dedication and care.
        </p>

        <div className="mt-6">
          <p className="text-green-800 font-semibold text-2xl">
            Supervised by:
          </p>
          <p className="text-green-900 font-bold text-2xl mt-2">
            Dr. Huda Abdulrahman Al-Muzaini
          </p>
        </div>
      </div>
    </div>
  );
}
