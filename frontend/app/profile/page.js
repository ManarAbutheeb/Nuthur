"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
export default function ProfilePage() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/log-in");
      return;
    }

    
    const userData = {
      name: localStorage.getItem("userName") || "User",
      email: localStorage.getItem("userEmail") || "No email",
      role: localStorage.getItem("userRole") || "User"
    };

    setUserData(userData);
  }, [router]);

  if (!userData) {
    return <div>{t("Loading...")}</div>;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-white text-center" style={{ backgroundColor: "#001a08de" }}>
              <h3>{t("My Profile")}</h3>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '80px', height: '80px', fontSize: '2rem', backgroundColor: "#001a08de" }}>
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                <h4>{userData.name}</h4>
                <span className="badge" style={{ backgroundColor: "#001a08de" }}>{userData.role}</span>
              </div>

              <div className="mb-4">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Role:</strong> {userData.role}</p>
              </div>

              <div className="d-grid gap-2">
                <Link href="/forgot-password" className="btn" style={{ color: "#001a08de" }}>
                  {t("Change Password?")}
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}