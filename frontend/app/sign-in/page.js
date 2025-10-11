"use client";
import { useState } from "react";
// أضيفي هذا السطر ↓
import Link from "next/link"; // هذا هو الحل

export default function SignInPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "volunteer" });
  const [message, setMessage] = useState("");
 const [isError, setIsError] = useState(false); // هذا هو الحل
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
setMessage("");
    setIsError(false); // تأكدي من استخدام setIsError هنا أيضًا
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registered successfully!");
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (err) {
      setMessage("❌ Server error: " + err.message);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Register</h1>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Enter name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-control" name="role" value={form.role} onChange={handleChange}>
            <option value="volunteer">Volunteer</option>
            <option value="employee">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-danger w-100" >Register</button>
      {/* رسالة النجاح أو الخطأ (يتغير لونها حسب الحالة) */}
        {message && (
          <p className={`text-center mt-3 ${isError ? 'text-danger' : 'text-success'}`}>
            {message}
          </p>
        )}

        {/* رابط للانتقال إلى صفحة Login إذا كان المستخدم مسجلاً بالفعل */}
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link href="/log-in" className="text-danger">
              Log In here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
