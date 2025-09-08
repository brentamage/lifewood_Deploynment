import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    if (users.find(u => u.email === formData.email)) {
      setError('User already exists with this email.');
      return;
    }

    users.push(formData);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(formData));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#C6D870] flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-md p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
