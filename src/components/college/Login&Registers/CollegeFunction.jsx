import { useState, useRef } from "react";
import { Link } from "react-router-dom";

function ManagerDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    // Clear any existing timeout
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Delay hiding dropdown
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 1 second
  };
  const handleClick = () => {
    setIsOpen(false); // Instantly hide dropdown on click
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="text-white ml-8 bg-red-600 px-4 py-2  rounded">
        College
      </button>

      {isOpen && (
        <div className="absolute text-white shadow-md bg-gray-950 mt-2 rounded w-40 z-50">
          <Link
            to="/college-login"
            onClick={handleClick}
            className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/college-register"
            onClick={handleClick}
            className="block px-4 py-2 hover:bg-gray-600"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default ManagerDropdown;
