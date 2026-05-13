import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>VNPR System</h2>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/upload">Upload</Link>
      </div>
    </nav>
  );
}