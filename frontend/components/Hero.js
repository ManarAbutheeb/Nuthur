// components/Hero.js
import React from "react";

export default function Hero() {
  return (
    <section
      className="text-center d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#051b05ff",
        color: "white",
        height: "100vh",
       
      }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold">
          Nuthur: Early Fire Detection System
        </h1>
        <p className="lead mt-3">
          Protecting the environment and promoting sustainability in the Soudah region using Artificial Intelligence.
        </p>
        <a
          href="#features"
          className="btn btn-danger btn-lg mt-3"
          style={{ backgroundColor: "#680707ff" }}
        >
          Discover Features
        </a>
      </div>
    </section>
  );
}
