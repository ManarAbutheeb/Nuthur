"use client";
import { useTranslation } from 'react-i18next';
import "../i18n";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  const router = useRouter();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole'); 
    
    setIsLoggedIn(!!token);
    setUserRole(role); // ⬅️ تعيين role مباشرة
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole'); 
    setIsLoggedIn(false);
    setUserRole(null);
    router.push('/log-in');
  };

  // ✅ دالة لتبديل اللغة
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor:"#001a08de", zIndex: 1000}}>
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">Nuthur</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
  
            {isLoggedIn ? (
              <>
                {userRole === 'volunteer' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" href="/" style={{ color: "#ffffffff" }}>{t('home')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/Volunteer/MyReports" style={{ color: "#ffffffff" }}>{t('myReports') || 'My Reports'}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#features" style={{ color: "#ffffffff" }}>{t('features')}</Link>
                    </li>
                  </>
                )}

                {userRole === 'employee' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" href="/employeeDashboard" style={{ color: "#ffffffff" }}>{t('home')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/employee/reports" style={{ color: "#ffffffff" }}>{t('allReports') || 'All Reports'}</Link>
                    </li>
                  </>
                )}

                {/* ⬅️ أزرار مشتركة لجميع المستخدمين المسجلين */}
                <li className="nav-item">
                  <Link className="nav-link" href="#contact" style={{ color: "#ffffffff" }}>{t('contact')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/profile" style={{ color: "#ffffffff" }}>{t('profile')}</Link>
                </li>
          
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout} style={{ color: "#ffffffff", textDecoration: 'none' }}>
                    {t('logout')}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/sign-in" style={{ color: "#ffffffff" }}>{t('signin')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/log-in" style={{ color: "#ffffffff" }}>{t('login')}</Link>
                </li>
              </>
            )}

            {/* 🌍 زر لتبديل اللغة */}
            <li className="nav-item">
              <button
                onClick={toggleLanguage}
                className="btn btn-link nav-link"
                style={{ color: "#ffffffff", textDecoration: 'none' }}
              >
                {i18n.language === 'en' ? 'العربية' : 'English'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
