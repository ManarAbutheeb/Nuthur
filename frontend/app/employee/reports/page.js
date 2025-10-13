"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
export default function EmployeeReports() {
   const { t } = useTranslation();
  const [allReports, setAllReports] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);


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


  const updateStatus = (id, status) => {
    const token = localStorage.getItem("authToken");

    fetch(`http://localhost:5000/api/reports/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updatedReport => {
        setAllReports(prev => prev.map(r =>
          r._id === updatedReport._id
            ? { ...r, status: updatedReport.status }
            : r
        ));
      })
      .catch(err => console.error("Error updating status:", err));
  };


  const filteredReports = allReports.filter(r =>
    r.user?.name?.toLowerCase().includes(searchName.toLowerCase()) &&
    (statusFilter === "All" || r.status === statusFilter)
  );

   if (loading) return <p>{t("1")}</p>;

  return (
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f9", padding: "20px", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>{t("2")}</h1>


      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder={t("3")}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ padding: "5px 10px", margin: "0 5px", fontSize: "14px" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "5px 10px", margin: "0 5px", fontSize: "14px" }}
        >
         <option value="All">{t("4")}</option>
          <option value="resolved">{t("5")}</option>
          <option value="rejected">{t("6")}</option>
          <option value="pending">{t("7")}</option>
        </select>
      </div>


      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredReports.length === 0 ? (
          <p>{t("8")}</p>
        ) : (
          filteredReports.map(report => (
            <div
              key={report._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "18px",
                margin: "10px",
                width: "340px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                backgroundColor:
                  report.status === "resolved" ? "rgba(40,167,69,0.1)" :
                    report.status === "rejected" ? "rgba(220,53,69,0.1)" :
                      "rgba(255,193,7,0.15)",
                transition: "transform 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div
                style={{
                  height: "6px",
                  width: "100%",
                  borderRadius: "4px",
                  backgroundColor:
                    report.status === "resolved"
                      ? "#28a745"
                      : report.status === "rejected"
                        ? "#dc3545"
                        : "#ffc107",
                  marginBottom: "10px"
                }}
              ></div>
              <h6 className="card-title text-truncate mb-0">
                 {t("9")}{report._id.slice(-6)}
              </h6>

           <p style={{ margin: "5px 0", fontSize: "14px", color: "#444"}}><strong>{t("10")}:</strong> {report.user?.name}</p>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#444" }}><strong>{t("11")}:</strong> {report.user?.email}</p>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#444" }}><strong>{t("12")}:</strong> {report.description}</p>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#444" }}><strong>{t("13")}: </strong>{report.location?.lat?.toFixed(4)}, {report.location?.lng?.toFixed(4)}</p>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#444" }}><strong>{t("14")}: </strong> {new Date(report.createdAt).toLocaleDateString()}</p>
              <p style={{ margin: "5px 0", fontSize: "14px", color:"#444" }}>
                <span style={{ fontWeight: "bold" }}> {t("15")}: {report.status}</span>
              </p>

              {report.modelPrediction && (
               <p style={{ margin: "5px 0", fontSize: "14px", color: "#444" }}>
                  <strong>{t("16")}:</strong> {report.modelPrediction}
                </p>
              )}
              {report.modelConfidence !== null && (
                <p style={{ margin: "5px 0", fontSize: "14px", color: "#444" }}>
                  <strong>{t("17")}:</strong> {(report.modelConfidence * 100).toFixed(1)}%
                </p>
              )}
              {report.modelCheckedAt && (
                <p style={{ margin: "5px 0", fontSize: "14px", color: "#444" }}>
                   <strong>{t("18")}:</strong> {new Date(report.modelCheckedAt).toLocaleString()}
                </p>
              )}


              <img
                src={`http://localhost:5000/api/reports/image/${report.image.split("\\").pop().split("/").pop()}`}
                alt="report"
                width="100%"
                style={{ borderRadius: "5px", marginTop: "10px" }}
              />



              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => updateStatus(report._id, "resolved")}
                  style={{ margin: "5px 5px 0 0", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", backgroundColor: "#055e1ae0", color: "white", border: "none", fontSize: "13px" }}
                >
                   {t("19")}
                </button>
                <button
                  onClick={() => updateStatus(report._id, "rejected")}
                  style={{ margin: "5px 5px 0 0", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", backgroundColor: "#990816ff", color: "white", border: "none", fontSize: "13px" }}
                >
                  {t("20")}
                </button>
                <button
                  onClick={() => updateStatus(report._id, "pending")}
                  style={{ margin: "5px 5px 0 0", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", backgroundColor: "#fafc97ff", color: "black", border: "none", fontSize: "13px" }}
                >
                   {t("21")}
                </button>
              </div>
              <button
  onClick={() =>
    window.open(`http://localhost:5000/api/pdf/report/${report._id}/pdf`, "_blank")
  }
  style={{
    margin: "8px 5px 0 0",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    fontSize: "13px",
  }}
>
   Download PDF
</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
