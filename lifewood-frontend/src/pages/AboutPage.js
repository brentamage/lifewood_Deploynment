import React from 'react';

function AboutPage() {
  return (
    <div className="bg-[#EFEAE3] min-h-screen">
      {/* Innovation Section */}
      <section className="bg-#f5eedb text-[#133020] text-center p-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-8">Innovation</h2>
          <p className="text-lg leading-relaxed mb-6 font-medium">
            At Lifewood, we believe in the transformative power of data. Our mission is to build intelligent systems that not only drive business efficiency but also create meaningful, positive change in society. We tackle complex challenges by blending cutting-edge research with practical, scalable applications.
          </p>
          <p className="text-lg leading-relaxed font-medium">
            Our team of world-class engineers, data scientists, and visionaries collaborates in an environment of deep curiosity and continuous learning. We are committed to ethical AI, ensuring our solutions are fair, transparent, and aligned with human values.
          </p>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="bg-[#F9F7F7] text-[#133020] text-center p-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-8">Our Expertise</h2>
          <p className="text-lg leading-relaxed mb-12 font-medium">
            We specialize in turning complex data into actionable intelligence across various domains.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Card 1: Machine Learning Solutions */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">Machine Learning Solutions</h3>
              <p className="text-base text-gray-700">
                From predictive analytics to computer vision, we develop custom machine learning models that automate processes, uncover hidden patterns, and provide a competitive edge.
              </p>
            </div>
            {/* Card 2: Data Strategy & Analytics */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">Data Strategy & Analytics</h3>
              <p className="text-base text-gray-700">
                We help businesses build a robust data foundation. Our services include data warehousing, business intelligence, and real-time dashboards to ensure you make informed decisions.
              </p>
            </div>
            {/* Card 3: Natural Language Processing */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">Natural Language Processing</h3>
              <p className="text-base text-gray-700">
                Unlock insights from text and speech. Our NLP services include sentiment analysis, chatbots, and text summarization to help you understand your customers and streamline communication.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;