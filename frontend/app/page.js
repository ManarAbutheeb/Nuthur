"use client";

import Hero from "../components/Hero";
import Features from "../components/Features";
import WeatherWidget from "../components/WeatherWidget";
export default function HomePage() {

  return (
    <>
    <WeatherWidget />
      <Hero />
      <Features />
    </>
  );
}
