import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CollegeOTPVerification = () => {
  const navigate = useNavigate();
  const length = 5;

  // OTP States
  const [emailOtp, setEmailOtp] = useState(Array(length).fill(""));
  const [mobileOtp, setMobileOtp] = useState(Array(length).fill(""));

  const emailRefs = useRef([]);
  const mobileRefs = useRef([]);

  const token = localStorage.getItem("collegeEmailVerifyToken");

  const handleChange = (e, index, type) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...(type === "email" ? emailOtp : mobileOtp)];
    newOtp[index] = value.slice(-1);

    type === "email" ? setEmailOtp(newOtp) : setMobileOtp(newOtp);

    // Auto-focus next
    if (value && index < length - 1) {
      const nextRef = type === "email" ? emailRefs : mobileRefs;
      nextRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index, type) => {
    const otpArray = type === "email" ? emailOtp : mobileOtp;

    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      const refs = type === "email" ? emailRefs : mobileRefs;
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e, type) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("").slice(0, length);
    const updated = Array(length).fill("");

    for (let i = 0; i < length; i++) {
      updated[i] = newOtp[i] || "";
    }

    if (type === "email") {
      setEmailOtp(updated);
      updated.forEach((val, i) => {
        if (emailRefs.current[i]) emailRefs.current[i].value = val;
      });
      emailRefs.current[newOtp.length - 1]?.focus();
    } else {
      setMobileOtp(updated);
      updated.forEach((val, i) => {
        if (mobileRefs.current[i]) mobileRefs.current[i].value = val;
      });
      mobileRefs.current[newOtp.length - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const emailCode = emailOtp.join("");
    const mobileCode = mobileOtp.join("");

    if (emailCode.length !== length || mobileCode.length !== length) {
      toast.error("Please enter both email and mobile OTPs.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_URI_COLLEGE}/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailOTP: emailCode,
            mobileOTP: mobileCode,
            token,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Both OTPs verified successfully!");
        setEmailOtp(Array(length).fill(""));
        setMobileOtp(Array(length).fill(""));
        localStorage.removeItem("collegeEmailVerifyToken");
        navigate("/college-login");
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  // Input field renderer
  const renderOtpInputs = (otpArray, refs, type) =>
    otpArray.map((digit, index) => (
      <input
        key={index}
        type="text"
        inputMode="numeric"
        maxLength="1"
        value={digit}
        onChange={(e) => handleChange(e, index, type)}
        onKeyDown={(e) => handleKeyDown(e, index, type)}
        onPaste={(e) => handlePaste(e, type)}
        ref={(el) => (refs.current[index] = el)}
        className="w-12 h-14 text-2xl text-center rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    ));

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl mr-4 font-semibold mb-6">Verify Your Email & Mobile</h2>

      {/* Email OTP */}
      <div className="mb-8 w-full max-w-xs mt-8">
        <p className="mb-2">Email OTP</p>
        <div className="flex gap-3" onPaste={(e) => handlePaste(e, "email")}>
          {renderOtpInputs(emailOtp, emailRefs, "email")}
        </div>
      </div>

      {/* Mobile OTP */}
      <div className="mb-16 w-full max-w-xs ">
        <p className="mb-2">Mobile OTP</p>
        <div className="flex gap-3" onPaste={(e) => handlePaste(e, "mobile")}>
          {renderOtpInputs(mobileOtp, mobileRefs, "mobile")}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="px-6 py-2 w-[310px] mr-[20px] bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
      >
        Verify OTPs
      </button>
    </div>
  );
};

export default CollegeOTPVerification;
