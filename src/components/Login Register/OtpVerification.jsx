// OTPVerification.js

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTPVerification = () => {
  const navigate = useNavigate();
  const length = 5;

  // ✅ Initialize OTP as an array
  const [otp, setOtp] = useState(Array(length).fill(""));
  const token = localStorage.getItem("emailVerifyToken");
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Limit to 1 digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("").slice(0, length);
    const updated = [...otp];

    for (let i = 0; i < length; i++) {
      updated[i] = newOtp[i] || "";
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = updated[i];
      }
    }

    setOtp(updated);

    // Move focus to last filled input
    const lastIndex = newOtp.length - 1;
    if (inputsRef.current[lastIndex]) {
      inputsRef.current[lastIndex].focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== length) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_URI_USER}/verify_otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: code, token }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP verified successfully!");
        setOtp(Array(length).fill("")); // ✅ Reset to array, not object
        localStorage.removeItem("emailVerifyToken");
        navigate("/login");
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-semibold mb-6">Verify Your Email</h2>

      <div className="flex gap-3 mb-6" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            className="w-12 h-14 text-2xl text-center rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 w-[290px] bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OTPVerification;
