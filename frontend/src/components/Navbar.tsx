function Navbar() {
  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <h1 className="logo">TeamUp</h1>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <div className="icon">🔔</div>
        <span className="username">Username</span>
        <div className="icon">👤</div>
      </div>
    </nav>
  );
}

export default Navbar;