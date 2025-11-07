import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL_URI_CONTACTS}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to subscribe");
   

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">MyCompany</h2>
          <p className="text-gray-400">
            Building better web experiences, one component at a time.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/service" className="hover:text-gray-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <a
            href="mailto:paperGinnie@gmail.com"
            onClick={(e) => {
              e.stopPropagation();
            }}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 block mb-2"
          >
            <span className="font-bold">Email:</span> paperGinnie@gmail.com
          </a>
          <a href="tel:+916396036585" className="text-gray-400 block mb-2">
            <span className="font-bold">Phone:</span> +91 6396036585
          </a>
          <p className="text-gray-400">
            <span className="font-bold">Address:</span> This is a web-based
            platform available online 24/7.
          </p>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-400 mb-2">
            Get the latest updates right in your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md text-black w-full sm:w-auto flex-grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {status === "success" && (
            <p className="mt-2 text-green-500">Thank you for subscribing!</p>
          )}
          {status === "error" && (
            <p className="mt-2 text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} Paper Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

