import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const navigate = useNavigate();
 const [formData, setFormData] = useState({
    name:'',
    email:'',
    subject:'',
    message:'',
  });

    const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_URI_CONTACTS}/contact`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
  
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          toast.error(data.message || "Registration failed");
        }
      } catch (error) {
        toast.error(`Registration failed: ${error.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          We'd love to hear from you. Fill out the form below and we’ll get back to you as soon as possible.
        </p>

        <form className="grid grid-cols-1 gap-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange}
              name='name'
              id="name"
              required
              className="mt-1 py-2 px-4 text-xl block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Enter Your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name='email'
              id="email"
              required
              className="mt-1 py-2 px-4 text-xl block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Enter Your Email"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={handleChange}
              name='subject'
              id="subject"
              required
              className="mt-1 py-2 px-4 text-xl block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="What can we help you with?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              name='message'
              onChange={handleChange}
              rows="4"
              required
              className="resize-none text-xl mt-1 py-2 px-4 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Write your message here..." 
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              onChange={handleChange}
              className="inline-flex w-full justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
