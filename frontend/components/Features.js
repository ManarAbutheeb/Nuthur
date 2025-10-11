import React from 'react';

export default function Features() {
  const features = [
    { title: "Fire Detection", desc: "Detect wildfires early to minimize damage" },
    { title: "Data Analysis", desc: "Use AI to analyze weather and temperature data" },
    { title: "Instant Alerts", desc: "Send quick alerts to authorities and field teams." },
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
        <h2 className="text-center mb-4">System Features</h2>
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