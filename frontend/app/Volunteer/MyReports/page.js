"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VolunteerReports() {
  const [myReports, setMyReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const router = useRouter();

  // جلب تقارير الفولنتيير الخاصة فقط
useEffect(() => {
  const fetchMyReports = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("⚠️ Please log in first");
        return;
      }

      const res = await fetch("http://localhost:5000/api/reports/my-reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await res.json();
      setMyReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load your reports");
    } finally {
      setLoading(false);
    }
  };

  fetchMyReports();
}, [router]);

  // تصفية التقارير حسب الحالة
  const filteredReports = myReports.filter(report =>
    statusFilter === "All" || report.status === statusFilter
  );

  // إحصائيات سريعة
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
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h4>Error</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* رأس الصفحة */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="text-center " style={{ color: "#062b11ff"}}>My Reports</h1>
          <p className="text-center text-muted">View and track all reports you've submitted</p>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="row mb-4">
        <div className="col-md-3 col-6 mb-3">
          <div className="card bg-primary text-white text-center">
            <div className="card-body">
              <h4 className="mb-0">{stats.total}</h4>
              <small>Total Reports</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card bg-warning text-dark text-center">
            <div className="card-body">
              <h4 className="mb-0">{stats.pending}</h4>
              <small>Pending</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card bg-success text-white text-center">
            <div className="card-body">
              <h4 className="mb-0">{stats.resolved}</h4>
              <small>Resolved</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card bg-danger text-white text-center">
            <div className="card-body">
              <h4 className="mb-0">{stats.rejected}</h4>
              <small>Rejected</small>
            </div>
          </div>
        </div>
      </div>

      {/* الفلتر */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Filter by Status:</h5>
            <select 
              className="form-select w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* قائمة التقارير */}
      <div className="row">
        {filteredReports.length === 0 ? (
          <div className="col-12">
            <div className="text-center py-5">
              <div className="text-muted">
                <i className="fas fa-inbox fa-3x mb-3"></i>
                <h4>No reports found</h4>
                <p>
                  {statusFilter === "All" 
                    ? "You haven't submitted any reports yet."
                    : `No ${statusFilter} reports found.`
                  }
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => router.push("/Volunteer/reportForm")}
                >
                  Submit Your First Report
                </button>
              </div>
            </div>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report._id} className="col-lg-6 col-xl-4 mb-4">
              <ReportCard report={report} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// مكون بطاقة التقرير
const ReportCard = ({ report }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "bg-warning text-dark", label: "⏳ Pending" },
      resolved: { class: "bg-success text-white", label: "✅ Resolved" },
      rejected: { class: "bg-danger text-white", label: "❌ Rejected" }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('data:image')) return image;
    return `http://localhost:5000/api/reports/image/${image}`;
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        {/* رأس البطاقة */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title text-truncate mb-0">
            Report #{report._id.slice(-6)}
          </h6>
          {getStatusBadge(report.status)}
        </div>

        {/* وصف التقرير */}
        <p className="card-text small text-muted">
          {report.description.length > 100 
            ? `${report.description.substring(0, 100)}...` 
            : report.description
          }
        </p>

        {/* الصورة */}
        {report.image && (
          <div className="mb-2">
            <img
              src={getImageUrl(report.image)}
              alt="Report evidence"
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

        {/* التفاصيل */}
        <div className="small text-muted">
          <div className="mb-1">
            <strong>Location:</strong> {report.location?.lat?.toFixed(4)}, {report.location?.lng?.toFixed(4)}
          </div>
          <div className="mb-1">
            <strong>Submitted:</strong> {new Date(report.createdAt).toLocaleDateString()}
          </div>
          {report.updatedAt && report.updatedAt !== report.createdAt && (
            <div>
              <strong>Last Updated:</strong> {new Date(report.updatedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      {/* تذييل البطاقة */}
      <div className="card-footer bg-transparent">
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {report.status === "pending" && "Under review"}
            {report.status === "resolved" && "Issue resolved"}
            {report.status === "rejected" && "Report rejected"}
          </small>
          {/* <button 
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
              // يمكن إضافة modal لعرض التفاصيل الكاملة
              alert(`Report Details:\n\nDescription: ${report.description}\nStatus: ${report.status}\nSubmitted: ${new Date(report.createdAt).toLocaleString()}`);
            }}
          > */}
            {/* View Details
          </button> */}
        </div>
      </div>
    </div>
  );
};