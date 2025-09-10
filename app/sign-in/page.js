export default function SignInPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Sign In</h1>
      <form className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>
        <button type="submit" className="btn btn-danger w-100">Sign In</button>
      </form>
    </div>
  );
}
