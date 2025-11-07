import React from 'react';
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  LightBulbIcon,
  PencilIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';


const services = [
  {
    title: "Previous Year Question Papers",
    description: "Access a wide range of previous year question papers across subjects and exams. Organized and easy to search.",
    icon: AcademicCapIcon,
  },
  {
    title: "AI-Solved Papers",
    description: "Let our AI solve question papers for you — step-by-step solutions with clear explanations.",
    icon: LightBulbIcon,
  },
  {
    title: "Download Papers",
    description: "Download any paper in PDF format for offline use. Fast and reliable.",
    icon: ArrowDownTrayIcon,
  },
  {
    title: "AI-Powered Notes",
    description: "Generate smart, summarized notes using AI based on questions or topics. Study faster and smarter.",
    icon: PencilIcon,
  },
  {
    title: "Lecture Suggestions",
    description: "Get lecture/video recommendations from YouTube or educational websites relevant to your study topics.",
    icon: VideoCameraIcon,
  },
];

const Services = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
          Everything you need to study smarter with AI.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
