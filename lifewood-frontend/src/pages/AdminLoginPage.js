import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = ({ setIsAdminLoggedIn }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // modal visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple hardcoded auth
    if (credentials.username === "admin" && credentials.password === "password") {
      setError("");
      setIsAdminLoggedIn(true);
      localStorage.setItem("adminToken", "loggedIn");

      // Show success modal
      setShowModal(true);
    } else {
      setError("Invalid username or password");
      setShowModal(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative"
      style={{
        background: "linear-gradient(135deg, #f5eedb 0%, #d7d0b9 100%)",
      }}
    >
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full">
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              ✅ Login Successful!
            </h3>
            <p className="text-gray-600 mb-6">Welcome Admin</p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/admin-dashboard"); // navigate after modal
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md rounded-3xl p-10 shadow-2xl backdrop-blur-sm bg-white/70 border border-[#133020]/40">
        <h2 className="text-4xl font-extrabold text-[#133020] mb-12 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-center text-red-600 font-semibold mb-6 animate-pulse">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="username"
            className="block mb-3 font-semibold text-[#133020] text-lg"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
            className="w-full mb-8 px-6 py-4 border-2 border-[#133020] rounded-xl placeholder-[#999] text-[#133020] font-medium text-lg focus:outline-none focus:ring-4 focus:ring-[#FFB347] focus:border-[#FFB347]"
          />

          <label
            htmlFor="password"
            className="block mb-3 font-semibold text-[#133020] text-lg"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="w-full mb-10 px-6 py-4 border-2 border-[#133020] rounded-xl placeholder-[#999] text-[#133020] font-medium text-lg focus:outline-none focus:ring-4 focus:ring-[#FFB347] focus:border-[#FFB347]"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FFB347] to-[#e89d36] text-[#133020] font-extrabold text-xl py-4 rounded-2xl shadow-lg hover:brightness-110 active:scale-95"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
