module.exports = [
"[project]/Downloads/Nuthur/frontend/.next-internal/server/app/sign-in/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/Downloads/Nuthur/frontend/app/layout.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/Nuthur/frontend/app/layout.js [app-rsc] (ecmascript)"));
}),
"[project]/Downloads/Nuthur/frontend/app/sign-in/page.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// "use client";
// import { useState } from "react";
// // أضيفي هذا السطر ↓
// import Link from "next/link"; // هذا هو الحل
// export default function SignInPage() {
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "volunteer" });
//   const [message, setMessage] = useState("");
//  const [isError, setIsError] = useState(false); // هذا هو الحل
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
// setMessage("");
//     setIsError(false); // تأكدي من استخدام setIsError هنا أيضًا
//     try {
//       const res = await fetch("http://localhost:5000/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage("✅ Registered successfully!");
//       } else {
//         setMessage("❌ Error: " + data.error);
//       }
//     } catch (err) {
//       setMessage("❌ Server error: " + err.message);
//     }
//   };
//   return (
//     <div className="container py-5">
//       <h1 className="mb-4">Register</h1>
//       <form className="w-50 mx-auto" onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Enter name" />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Role</label>
//           <select className="form-control" name="role" value={form.role} onChange={handleChange}>
//             <option value="volunteer">Volunteer</option>
//             <option value="employee">Employee</option>
//           </select>
//         </div>
//         <button type="submit" className="btn btn-danger w-100" >Register</button>
//       {/* رسالة النجاح أو الخطأ (يتغير لونها حسب الحالة) */}
//         {message && (
//           <p className={`text-center mt-3 ${isError ? 'text-danger' : 'text-success'}`}>
//             {message}
//           </p>
//         )}
//         {/* رابط للانتقال إلى صفحة Login إذا كان المستخدم مسجلاً بالفعل */}
//         <div className="text-center mt-3">
//           <p>
//             Already have an account?{" "}
//             <Link href="/log-in" className="text-danger">
//               Log In here
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }
}),
"[project]/Downloads/Nuthur/frontend/app/sign-in/page.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/Nuthur/frontend/app/sign-in/page.js [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__24daa6e8._.js.map