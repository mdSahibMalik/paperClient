// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ManagerDropdown from "./college/Login&Registers/CollegeFunction";
import { toast } from "react-toastify";

function Navbar() {
  const [decoded, setDecoded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to get and decode token
    const updateDecoded = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = jwtDecode(token);
          setDecoded(user);
        } catch (error) {
          console.error("Invalid token:", error);
          setDecoded(null);
        }
      } else {
        setDecoded(null);
      }
    };

    updateDecoded(); // run once on mount
    // Listen for token changes (optional but recommended)
    window.addEventListener("storage", updateDecoded);
    window.addEventListener("tokenChanged", updateDecoded);

    return () => {
      window.removeEventListener("storage", updateDecoded);
      window.removeEventListener("tokenChanged", updateDecoded);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_LOCAL_URI_USER}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message, "Logout Successfully");
        localStorage.removeItem("token");
        setDecoded(null);
        window.dispatchEvent(new Event("tokenChanged"));
        navigate("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("something went wrong", error);
    }
  };

  // 🧩 if / else if / else for buttons
  let navButtons;

  if (decoded && decoded.role === "admin") {
    navButtons = (
      <div className="hidden md:flex space-x-4">
        <Link
          to="/admin-dashboard"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    );
  } else if (decoded && decoded.role === "college") {
    navButtons = (
      <div className="hidden md:flex space-x-4">
        <Link
          to="/college-dashboard"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    );
  } else if (decoded && decoded.role === "user") {
    navButtons = (
      <div className="hidden md:flex space-x-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Logout
        </button>
        <ManagerDropdown />
      </div>
    );
  } else {
    navButtons = (
      <div className="hidden md:flex space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-200 hover:text-blue-900"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register
        </Link>
        <ManagerDropdown />
      </div>
    );
  }
  return (
    <nav className="bg-white shadow-md">
      <div className="w-full xl:w-[95%] mx-auto  sm:px-6 lg:px-8 px-0 ">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-600">
              Paper <span className="text-orange-700 ">Store</span>{" "}
            </h1>
          </div>

          {/* Center: Nav Links */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 underline"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                Contact Us
              </NavLink>
            </li>
            {/* //! this is for private route  */}
            {/* <li>
              <NavLink
                to="/protect"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                Protect
              </NavLink>
            </li> */}
          </ul>

          {/* Right: Buttons */}
          {/* {decoded && decoded.role === "user" ? (
            <div className="hidden md:flex space-x-4">
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Logout
              </Link>
              <ManagerDropdown />
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-200 hover:text-blue-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Register
              </Link>
              <ManagerDropdown />
            </div>
          )} */}
          {navButtons}

          {/* Mobile menu button (optional) */}
          <div className="md:hidden">
            <button>
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
