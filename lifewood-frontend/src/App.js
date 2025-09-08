import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ApplicationFormPage from "./components/ApplicationFormPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";

// ✅ ProtectedRoute component
const ProtectedRoute = ({ isAdminLoggedIn, children }) => {
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
    setShowLogoutModal(false);
    setShowMobileMenu(false);
  };

  return (
    <Router>
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white text-[#014421] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/images/lifewood-logo.png"
              alt="Lifewood Logo"
              className="h-12 w-auto"
            />
            <span className="text-xl font-extrabold tracking-wide"></span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-8 text-lg font-semibold">
            {!isAdminLoggedIn && (
              <>
                <Link
                  to="/"
                  className="hover:text-[#FFB347] transition-colors duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className="hover:text-[#FFB347] transition-colors duration-300"
                >
                  Projects
                </Link>
                <Link
                  to="/about"
                  className="hover:text-[#FFB347] transition-colors duration-300"
                >
                  About
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Admin */}
          <div className="hidden md:flex">
            {!isAdminLoggedIn ? (
              <Link
                to="/admin-login"
                className="bg-[#FFB347] text-[#133020] px-4 py-2 rounded-lg shadow-md hover:bg-[#ff9e2c] transition"
              >
                Admin Login
              </Link>
            ) : (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-[#014421] focus:outline-none"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {showMobileMenu && (
          <div className="md:hidden bg-white px-6 pb-4 space-y-4 text-lg text-[#014421]">
            {!isAdminLoggedIn && (
              <>
                <Link
                  to="/"
                  className="block hover:text-[#FFB347]"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className="block hover:text-[#FFB347]"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Projects
                </Link>
                <Link
                  to="/about"
                  className="block hover:text-[#FFB347]"
                  onClick={() => setShowMobileMenu(false)}
                >
                  About
                </Link>
              </>
            )}

            {!isAdminLoggedIn ? (
              <Link
                to="/admin-login"
                className="block bg-[#FFB347] text-[#133020] px-4 py-2 rounded-lg shadow-md hover:bg-[#ff9e2c] transition"
                onClick={() => setShowMobileMenu(false)}
              >
                Admin Login
              </Link>
            ) : (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* ✅ Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full">
            <h3 className="text-2xl font-bold text-red-600 mb-4">⚠️ Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Routes */}
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/apply" element={<ApplicationFormPage />} />
          <Route
            path="/admin-login"
            element={<AdminLoginPage setIsAdminLoggedIn={setIsAdminLoggedIn} />}
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
