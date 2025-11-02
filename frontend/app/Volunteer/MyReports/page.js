"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function VolunteerReports() {
    const { t } = useTranslation();
  const [myReports, setMyReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const router = useRouter();

  
useEffect(() => {
  const fetchMyReports = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError(t(" Please log in first"));
        return;
      }

      const res = await fetch("http://localhost:5000/api/reports/my-reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(t("Failed to fetch reports"));
      }

      const data = await res.json();
      setMyReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError(t("Failed to load your reports"));
    } finally {
      setLoading(false);
    }
  };

  fetchMyReports();
}, [router]);

 
  const filteredReports = myReports.filter(report =>
    statusFilter === "All" || report.status === statusFilter
  );


  const stats = {
    total: myReports.length,
    pending: myReports.filter(r => r.status === "pending").length,
    resolved: myReports.filter(r => r.status === "resolved").length,
    rejected: myReports.filter(r => r.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{t("Loading...")}</span>
          </div>
          <p className="mt-2">{t("Loading your reports...")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h4>{t("Error")}</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
   
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="text-center " style={{ color: "#062b11ff"}}>{t("My Reports")}</h1>
          <p className="text-center text-muted">{t("View and track all reports you've submitted")}</p>
        </div>
      </div>

     


<div className="row mb-4">
        <StatsCard color="bg-primary text-white" count={stats.total} label={t("Total Reports")} />
        <StatsCard color="bg-warning text-dark" count={stats.pending} label={t("Pending")} />
        <StatsCard color="bg-success text-white" count={stats.resolved} label={t("Resolved")} />
        <StatsCard color="bg-danger text-white" count={stats.rejected} label={t("Rejected")} />
      </div>

    
      <div className="row mb-3">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
             <h5>{t("Filter by Status:")}</h5>
            <select 
              className="form-select w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">{t("All Statuses")}</option>
            <option value="pending">{t("Pending")}</option>
            <option value="resolved">{t("Resolved")}</option>
            <option value="rejected">{t("Rejected")}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredReports.length === 0 ? (
          <div className="col-12">
            <div className="text-center py-5">
              <div className="text-muted">
                <i className="fas fa-inbox fa-3x mb-3"></i>
                 <h4>{t("No reports found")}</h4>
                <p>
                   {statusFilter === "All"
                ? t("You haven't submitted any reports yet.")
                : t(`No ${statusFilter} reports found.`)
              }
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => router.push("/Volunteer/reportForm")}
                >
                    {t("Submit Your First Report")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report._id} className="col-lg-6 col-xl-4 mb-4">
              <ReportCard report={report} t={t} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
const StatsCard = ({ color, count, label }) => (
  <div className="col-md-3 col-6 mb-3">
    <div className={`card ${color} text-center`}>
      <div className="card-body">
        <h4 className="mb-0">{count}</h4>
        <small>{label}</small>
      </div>
    </div>
  </div>
);
const ReportCard = ({ report, t }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "bg-warning text-dark", label: t(" Pending") },
      resolved: { class: "bg-success text-white", label: t(" Resolved") },
      rejected: { class: "bg-danger text-white", label: t(" Rejected") }
    };
    return <span className={`badge ${statusConfig[status]?.class || "bg-warning text-dark"}`}>
      {statusConfig[status]?.label || t(" Pending")}
    </span>;
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('data:image')) return image;
    return `http://localhost:5000/api/reports/image/${image}`;
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
      
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title text-truncate mb-0">
            Report #{report._id.slice(-6)}
          </h6>
          {getStatusBadge(report.status)}
        </div>

        <p className="card-text small text-muted">
          {report.description.length > 100 
            ? `${report.description.substring(0, 100)}...` 
            : report.description
          }
        </p>

        
        {report.image && (
          <div className="mb-2">
            <img
              src={getImageUrl(report.image)}
              alt={t("Report evidence")}
              className="img-fluid rounded"
              style={{ 
                maxHeight: "120px", 
                width: "100%", 
                objectFit: "cover" 
              }}
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}

        <div className="small text-muted">
          <div className="mb-1">
              <strong>{t("Location")}:</strong> {report.location?.lat?.toFixed(4)}, {report.location?.lng?.toFixed(4)}
          </div>
          <div className="mb-1">
             <strong>{t("Submitted")}:</strong> {new Date(report.createdAt).toLocaleDateString()}
          </div>
          {report.updatedAt && report.updatedAt !== report.createdAt && (
            <div>
                  <strong>{t("Last Updated")}:</strong> {new Date(report.updatedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>


      <div className="card-footer bg-transparent">
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
          {report.status === "pending" && t("Under review")}
            {report.status === "resolved" && t("Issue resolved")}
            {report.status === "rejected" && t("Report rejected")}
          </small>
      
        </div>
      </div>
    </div>
  );
};