"use client";

// تأكدي أن كل المكونات موجودة بالمسار الصحيح
import Hero from "../components/Hero";
import Features from "../components/Features";
import WeatherWidget from "../components/WeatherWidget";

export default function HomePage() {
  return (
    <main>
      {/* أي مكون يحتاج client */}
      <WeatherWidget />

      {/* المكونات الرئيسية */}
      <Hero />
      <Features />
    </main>
  );
}
