import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage: 'url("/images/AI3.png")',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5eedb]/90 via-white/80 to-pink-100/70 z-0"></div>

      {/* Floating Blobs */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-16 w-52 h-52 bg-green-300/30 rounded-full blur-3xl animate-pulse"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl text-center bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/40 animate-fadeIn">
        <span className="px-4 py-1 mb-6 inline-block text-sm font-semibold rounded-full bg-gradient-to-r from-pink-200 to-orange-200 text-[#133020] shadow-sm">
          AI • Data • Innovation
        </span>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
            Lifewood
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 mb-6 font-medium">
          Shaping the future with AI and data-driven innovation.
        </p>

        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
          Lifewood is a global leader dedicated to impactful AI and
          data-driven solutions that change the world.
        </p>

        <Link
          to="/apply"
          className="inline-block py-4 px-10 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-pink-400 via-pink-500 to-orange-400 text-white"
        >
          Apply Now
        </Link>
      </div>

      {/* Modern Info Cards */}
      <div className="relative z-10 mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {/* Card 1 */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-white/40">
          <h3 className="text-2xl font-bold text-[#014421] mb-4">Global Impact</h3>
          <p className="text-gray-600">
            Driving AI and data solutions that impact businesses and communities worldwide.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-white/40">
          <h3 className="text-2xl font-bold text-[#014421] mb-4">Innovation</h3>
          <p className="text-gray-600">
            We deliver cutting-edge solutions, powered by creativity and innovation.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-white/40">
          <h3 className="text-2xl font-bold text-[#014421] mb-4">Opportunities</h3>
          <p className="text-gray-600">
            Join Lifewood and explore limitless career growth with real-world AI projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
