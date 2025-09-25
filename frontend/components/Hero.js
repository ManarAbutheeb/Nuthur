// components/Hero.js
import React from "react";

export default function Hero() {
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
        <h1 className="display-4 fw-bold">
          Nuthur: Early Fire Detection System
        </h1>
        <p className="lead mt-3">
          Protecting the environment and promoting sustainability in the Soudah region using Artificial Intelligence.
        </p>
      
         <a
          href="Volunteer/reportForm"
          className="btn btn-danger btn-lg mt-3"
          style={{ backgroundColor: "#680707ff" }}
        >Create Report</a>
<p></p>
        <a
          href="#features"
          className="btn btn-danger btn-lg "
          style={{ backgroundColor: "#680707ff" }}
        >
          Discover Features
        </a>
      </div>
    </section>
  );
}
