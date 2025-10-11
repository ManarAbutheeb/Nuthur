"use client";
import WeatherWidget from "../../components/WeatherWidget";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EmployeeDashboard() {
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
    };

    setUserData(userData);
  }, [router]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", 
      justifyContent: "space-between"
    }}>

 <WeatherWidget />
  
      <div style={{ textAlign: "center" }}>
        <h1>Welcome Back, {userData?.name || "Admin"}</h1>

          <Link
  href="/employee/manual-checks"
  className="btn btn-lg"
  style={{
    backgroundColor: "#628665ff",
    color: "white",
    borderRadius: "5px",
    marginTop: "20px",
    padding: "10px 20px",
    display: "inline-block",
  }}
>
  Check weather
</Link>

    
     
      </div>


      <footer >
       
      </footer>
    </div>
  );
}
