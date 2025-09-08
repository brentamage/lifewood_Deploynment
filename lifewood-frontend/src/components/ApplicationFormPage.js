import React, { useState } from 'react';

function ApplicationFormPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    degree: '',
    experience: '',
    email: '',
    projectId: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // ✅ Hardcoded project data (instead of from backend)
  const projects = [
    { _id: '64a5f64cfcc2d7a1a5e3a101', name: 'AI Research Assistant' },
    { _id: '64a5f64cfcc2d7a1a5e3a102', name: 'Data Annotation Tool' },
    { _id: '64a5f64cfcc2d7a1a5e3a103', name: 'Financial Sentiment Analyzer' },
    { _id: '64a5f64cfcc2d7a1a5e3a104', name: 'Healthcare NLP Pipeline' },
    { _id: '64a5f64cfcc2d7a1a5e3a105', name: 'Smart Document Scanner' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedProject = projects.find((p) => p._id === formData.projectId);

    try {
      const response = await fetch(`http://localhost:5000/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          age: formData.age,
          degree: formData.degree,
          experience: formData.experience,
          email: formData.email,
          project: formData.projectId,
          projectName: selectedProject?.name || '', // ✅ required by backend
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setSubmitted(true);
      setFormData({
        fullName: '',
        age: '',
        degree: '',
        experience: '',
        email: '',
        projectId: '',
      });
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5eedb] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#e6dcc6] px-8 sm:px-12 py-12 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-center text-[#133020] mb-10 tracking-wide">
          Apply for a Project
        </h2>

        {submitted && (
          <p className="bg-green-100 text-green-800 font-medium text-center py-3 px-4 rounded-md mb-6 border border-green-300">
            ✅ Application submitted successfully!
          </p>
        )}

        {error && (
          <p className="bg-red-100 text-red-700 font-medium text-center py-3 px-4 rounded-md mb-6 border border-red-300">
            ❌ {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-[#133020]">
          <div>
            <label htmlFor="fullName" className="block font-semibold mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#ccc] rounded-lg focus:ring-2 focus:ring-[#FFB347] outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="age" className="block font-semibold mb-1">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="18"
              max="100"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#ccc] rounded-lg focus:ring-2 focus:ring-[#FFB347] outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="degree" className="block font-semibold mb-1">
              Degree
            </label>
            <input
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#ccc] rounded-lg focus:ring-2 focus:ring-[#FFB347] outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block font-semibold mb-1">
              Relevant Experience
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 border border-[#ccc] rounded-lg focus:ring-2 focus:ring-[#FFB347] outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#ccc] rounded-lg focus:ring-2 focus:ring-[#FFB347] outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="projectId" className="block font-semibold mb-1">
              Project Applied For
            </label>
            <select
              id="projectId"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#ccc] rounded-lg bg-white focus:ring-2 focus:ring-[#FFB347] outline-none transition"
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFB347] text-[#133020] font-bold py-3 rounded-lg shadow-md hover:bg-[#e89d36] transition duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationFormPage;
