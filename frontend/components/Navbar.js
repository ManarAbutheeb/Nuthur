"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

 const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    router.push('/log-in');
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
            <li className="nav-item"><Link className="nav-link active" href="/" style={{ color: "#ffffffff" }}>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" href="#features" style={{ color: "#ffffffff" }}>Features</Link></li>
            <li className="nav-item"><Link className="nav-link" href="#contact" style={{ color: "#ffffffff" }}>Contact Us</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/"style={{ color: "#ffffffff" }}>Profile</Link></li>
             <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogout} style={{ color: "#ffffffff",textDecoration: 'none' }}>
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" href="/sign-in" style={{ color: "#ffffffff" }}>Sign In</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/log-in" style={{ color: "#ffffffff" }}>Log In</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
