import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  // ... your projects array remains the same
  {
    id: 1,
    title: 'AI Data Extraction',
    description:
      'A brief description of the AI Data Extraction project will go here, outlining its goals and impact.',
  },
  {
    id: 2,
    title: 'Machine Learning Enablement',
    description:
      'A brief description of the Machine Learning Enablement project will go here, outlining its goals and impact.',
  },
  {
    id: 3,
    title: 'Genealogy',
    description:
      'A brief description of the Genealogy project will go here, outlining its goals and impact.',
  },
  {
    id: 4,
    title: 'Natural Language Processing',
    description:
      'A brief description of the Natural Language Processing project will go here, outlining its goals and impact.',
  },
  {
    id: 5,
    title: 'AI-Enabled Customer Service',
    description:
      'A brief description of the AI-Enabled Customer Service project will go here, outlining its goals and impact.',
  },
  {
    id: 6,
    title: 'Computer Vision',
    description:
      'A brief description of the Computer Vision project will go here, outlining its goals and impact.',
  },
  {
    id: 7,
    title: 'Autonomous Driving Technology',
    description:
      'A brief description of the Autonomous Driving Technology project will go here, outlining its goals and impact.',
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-[#f5eedb] py-20 px-6 sm:px-10">
      {/* Enhanced the drop-shadow on the title for more depth */}
      <h1 className="text-5xl font-extrabold mb-16 text-center text-[#133020] tracking-wider drop-shadow-lg">
        Available Projects
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => (
          <div
            key={project.id}
            // NEW: Added flexbox for alignment, a more subtle border, a larger initial shadow,
            // and more engaging hover effects (lift and brighter shadow).
            className="flex flex-col bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out group"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#133020] drop-shadow-sm">
              {project.title}
            </h2>
            {/* NEW: Added flex-grow to make the description area expand, pushing the button to the bottom. */}
            <p className="text-gray-700 mb-6 text-base leading-relaxed flex-grow">
              {project.description}
            </p>

            <Link
              to="/apply"
              // NEW: Added a transform for a subtle zoom effect on hover, and made sure the
              // button is self-aligned to the start of its container.
              className="self-start inline-block bg-gradient-to-r from-[#FFB347] to-[#f9a12d] hover:from-[#e89d36] hover:to-[#d38313] text-[#133020] font-semibold py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
            >
              Apply for this Project
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;