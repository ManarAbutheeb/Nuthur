import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#b22222", zIndex: 1000 }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">Nuthur</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link active" href="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" href="#features">Features</Link></li>
            <li className="nav-item"><Link className="nav-link" href="#contact">Contact Us</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/sign-in">Sign In</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/log-in">Log In</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
