import Link from "next/link";

export default function LogInPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Log In</h1>
      <form className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Username or Email</label>
          <input type="text" className="form-control" placeholder="Enter username or email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>
        <button type="submit" className="btn btn-danger w-100 mb-3">Log In</button>
        <div className="text-center">
          <Link href="/forgot-password" className="text-danger">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}
