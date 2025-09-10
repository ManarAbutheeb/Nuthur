export default function ForgotPasswordPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Forgot Password</h1>
      <p className="mb-3">Enter your email to reset your password:</p>
      <form className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter your email" />
        </div>
        <button type="submit" className="btn btn-danger w-100">Send Reset Link</button>
      </form>
    </div>
  );
}
