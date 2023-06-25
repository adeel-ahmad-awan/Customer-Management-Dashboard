import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "./assets/images/logo.png";
import avatar from "./assets/images/avatar.png";
import { useState } from "react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <img src={logo} alt="Logo" className="logo-image" />
        <span className="logo-text">DEV APP</span>
      </Link>
      <ul>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/customers">Customers</CustomLink>
      </ul>
      <div className="navbar-dropdown">
        <img src={avatar} alt="avatar" className="avatar-image" />
        <span className="avatar-button" onClick={handleDropdownOpen}>
          Adeel Ahmad
        </span>
        {dropdownOpen && (
          <div className="dropdown-content">
            <Link to={`/logout`}>Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
