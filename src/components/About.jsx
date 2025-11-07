import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gray-900 text-white">
      
      {/* Hero Section */}
      <section className="relative bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 items-center gap-10">
          
          {/* Text */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-blue-500">About Paper Store</h1>
            <p className="text-lg text-gray-300">
              Paper Store is a free platform created to empower students by providing access to previous year question papers from various colleges and universities — all in one place.
              Download, solve, and even get AI-powered help – all without paying a single rupee.
            </p>
          </div>

          {/* Image */}
          <div>
            <img 
              src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg"
              alt="Students solving papers"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-blue-400 mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg">
            We believe that every student deserves equal access to resources that can help them succeed. 
            Our mission is to remove the barriers to learning by making previous year papers easily available, accessible, and interactive through AI.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-semibold text-center text-blue-400 mb-10">Why Use Paper Store?</h3>
          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-gray-800 rounded-lg shadow p-6 text-center">
              <h4 className="text-xl font-semibold mb-2 text-blue-500">100% Free</h4>
              <p className="text-gray-300">No subscriptions. No hidden charges. Just download and start learning.</p>
            </div>

            <div className="bg-gray-800 rounded-lg shadow p-6 text-center">
              <h4 className="text-xl font-semibold mb-2 text-blue-500">AI Assistance</h4>
              <p className="text-gray-300">Stuck on a question? Use our built-in AI to get help instantly.</p>
            </div>

            <div className="bg-gray-800 rounded-lg shadow p-6 text-center">
              <h4 className="text-xl font-semibold mb-2 text-blue-500">Wide Coverage</h4>
              <p className="text-gray-300">Papers from various universities and colleges, all in one place.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto text-blue-500 px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Start Exploring Papers Today</h3>
          <p className="text-lg text-gray-300 mb-6">Join thousands of students already using Paper Store to prepare better, smarter, and faster.</p>
          <Link 
            to="/"
          >
            <button className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-md font-semibold transition">Browse Papers</button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
