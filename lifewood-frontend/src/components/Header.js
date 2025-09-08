import React from "react";

function Header() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return (
    <header
      style={{
        backgroundColor: "#166534",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div style={{ color: "white", fontWeight: "bold", fontSize: "24px" }}>
        Lifewood
      </div>

      {/* Center nav links */}
      <nav
        style={{
          backgroundColor: "white",
          padding: "8px 24px",
          borderRadius: "8px",
          display: "flex",
          gap: "20px",
          flexGrow: 1,
          justifyContent: "center",
          margin: "0 40px",
        }}
      >
        <a href="/" style={{ color: "#166534", fontWeight: "600", textDecoration: "none" }}>
          Home
        </a>
        <a href="/projects" style={{ color: "#166534", fontWeight: "600", textDecoration: "none" }}>
          Projects
        </a>
        <a href="/about" style={{ color: "#166534", fontWeight: "600", textDecoration: "none" }}>
          About
        </a>
        {/* The 'Apply' button was previously here */}
      </nav>

      {/* Auth Buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        {user ? (
          <>
            <span style={{ color: "white", fontWeight: "600" }}>{user.fullName}</span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                fontWeight: "600",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a
              href="/login"
              style={{
                backgroundColor: "#15803d",
                color: "white",
                fontWeight: "600",
                padding: "8px 16px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Login
            </a>
            <a
              href="/signup"
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                fontWeight: "600",
                padding: "8px 16px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Sign Up
            </a>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;