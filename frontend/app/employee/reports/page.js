"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function EmployeeReports() {
  const [allReports, setAllReports] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch reports from backend
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch("http://localhost:5000/api/reports", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAllReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching reports:", err);
        setLoading(false);
      });
  }, []);

  // Update report status
  const updateStatus = (id, status) => {
    const token = localStorage.getItem("authToken");

    fetch(`http://localhost:5000/api/reports/update/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
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
    r.user?.name?.toLowerCase().includes(searchName.toLowerCase()) &&
    (statusFilter === "All" || r.status === statusFilter)
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f9", padding: "20px", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Employee - Volunteer Reports Dashboard</h1>

      {/* Filters */}
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
          <option value="resolved">resolved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Reports */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredReports.length === 0 ? (
          <p>No reports found</p>
        ) : (
          filteredReports.map(report => (
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
                  report.status === "resolved" ? "#d4edda" :
                  report.status === "rejected" ? "#f8d7da" :
                  "#fff3cd",
                transition: "transform 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
                 <h6 className="card-title text-truncate mb-0">
            Report #{report._id.slice(-6)}
          </h6>
          
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}><strong>Volunteer Name:</strong> {report.user?.name}</p>
                 <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}><strong>Email:</strong> {report.user?.email}</p>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}><strong>Description:</strong> {report.description}</p>
               <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}><strong>Location: </strong>{report.location?.lat?.toFixed(4)}, {report.location?.lng?.toFixed(4)}</p>
                <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}><strong>Created At: </strong> {new Date(report.createdAt).toLocaleDateString()}</p>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
                <span style={{ fontWeight: "bold" }}> Status: {report.status}</span>
              </p>
               
              {/* صورة البلاغ */}
      
  <img
    src={`http://localhost:5000/api/reports/image/${report.image.split("\\").pop().split("/").pop()}`} 
    alt="report"
    width="100%"
    style={{ borderRadius: "5px", marginTop: "10px" }}
  />



              {/* أزرار التحكم */}
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => updateStatus(report._id, "resolved")}
                  style={{ margin: "5px 5px 0 0", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", fontSize: "13px" }}
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(report._id, "rejected")}
                  style={{ margin: "5px 5px 0 0", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", backgroundColor: "#dc3545", color: "white", border: "none", fontSize: "13px" }}
                >
                  Reject
                </button>
                <button
                  onClick={() => updateStatus(report._id, "pending")}
                  style={{ margin: "5px 5px 0 0", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", backgroundColor: "#ffc107", color: "black", border: "none", fontSize: "13px" }}
                >
                  Pending
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
