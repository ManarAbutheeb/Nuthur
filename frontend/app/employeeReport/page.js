"use client";
import { useEffect, useState } from "react";

export default function EmployeeReports() {
  const [allReports, setAllReports] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch reports from backend
  useEffect(() => {
    fetch("/api/reports") // عدل هذا حسب الـ API endpoint عندك
      .then(res => res.json())
      .then(data => setAllReports(data))
      .catch(err => console.error("Error fetching reports:", err));
  }, []);

  // Update report status
  const updateStatus = (id, status) => {
    fetch(`/api/reports/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(updatedReport => {
      setAllReports(prev => prev.map(r => r._id === updatedReport._id ? updatedReport : r));
    })
    .catch(err => console.error("Error updating status:", err));
  };

  // Apply filters
  const filteredReports = allReports.filter(r =>
    r.user.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (statusFilter === "All" || r.status === statusFilter)
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f9", padding: "20px", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Employee - Volunteer Reports Dashboard</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by volunteer name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ padding: "5px 10px", margin: "0 5px", fontSize: "14px" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "5px 10px", margin: "0 5px", fontSize: "14px" }}
        >
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredReports.map(report => (
          <div
            key={report._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              margin: "10px",
              width: "300px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor:
                report.status === "Approved" ? "#d4edda" :
                report.status === "Rejected" ? "#f8d7da" :
                "#fff3cd",
              transition: "transform 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#555" }}>{report.user.name}</h3>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>Description: {report.description}</p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
              Status: <span style={{ fontWeight: "bold" }}>{report.status}</span>
            </p>
            <div>
              <button
                onClick={() => updateStatus(report._id, "Approved")}
                style={{ margin: "5px 5px 0 0", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", fontSize: "13px" }}
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(report._id, "Rejected")}
                style={{ margin: "5px 5px 0 0", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", backgroundColor: "#dc3545", color: "white", border: "none", fontSize: "13px" }}
              >
                Reject
              </button>
              <button
                onClick={() => updateStatus(report._id, "Pending")}
                style={{ margin: "5px 5px 0 0", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", backgroundColor: "#ffc107", color: "black", border: "none", fontSize: "13px" }}
              >
                Pending
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
