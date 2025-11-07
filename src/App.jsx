import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MainLayout from "./components/Mainlayouts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Pages
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import ContactUs from "./components/Contact";
import LoginRegisterForm from "./components/Login Register/Login";
import RegisterUser from "./components/Login Register/Register";
import OTPVerification from "./components/Login Register/OtpVerification";

// College
import RegisterCollege from "./components/college/Login&Registers/RegisterCollege";
import LoginCollege from "./components/college/Login&Registers/LoginCollege";
import CollegeOTPVerification from "./components/college/Login&Registers/EmailVerification";
import Dashboard from "./components/college/CollegeDeshboard/Dashboard";
import Create from "./components/college/CollegeDeshboard/components/Create";
import Documents from "./components/college/CollegeDeshboard/components/Documents";
import Profile from "./components/college/CollegeDeshboard/components/Profile";
import UpdateDocument from "./components/college/CollegeDeshboard/components/UpdateDocument";
import EditProfile from "./components/college/CollegeDeshboard/components/EditProfile";
import NotFound from "./components/NotFound"; // 404 page component
import PrivateRoute from "./components/PrivateRoute";
// import Protect from "./components/Protect";

// Admin
import AdminDashboard from "./components/admin/AdminDashboard";
import LoginAdmin from "./components/admin/components/Login";
import RegisteredColleges from "./components/admin/components/RegisteredColleges";


function App() {
  return (
    <>
      <MainLayout>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginRegisterForm />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          {/*//! User protected routes */}
          {/* <Route element={<PrivateRoute requiredRoles={["college","admin","user"]}/>}>
            <Route path="protect" element={<Protect />} />
          </Route> */}
          {/* College Auth */}
          <Route path="/college-register" element={<RegisterCollege />} />
          <Route
            path="/college-verify-otp"
            element={<CollegeOTPVerification />}
          />
          <Route path="/college-login" element={<LoginCollege />} />

          {/* College Dashboard with Nested Routes */}
          <Route path="/college-dashboard" element={<Dashboard />}>
            <Route element={<PrivateRoute requiredRoles={["college","admin"]} />}>
              <Route index element={<Navigate to="create" />} />
              <Route path="create" element={<Create />} />
              <Route path="documents" element={<Documents />} />
              <Route path="profile" element={<Profile />} />
              <Route path="update/:id" element={<UpdateDocument />} />
              <Route path="editprofile" element={<EditProfile />} />
              {/* Catch all unmatched nested routes */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          {/* College Dashboard with Nested Routes */}

          <Route path="/admin-dashboard-login" element={<LoginAdmin />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route element={<PrivateRoute requiredRoles="admin" />}>
              <Route index element={<Navigate to="colleges" />} />
              <Route path="colleges" element={<RegisteredColleges />} />
              <Route path="college-dashboard" element={<Dashboard />} />
              {/* <Route path="documents" element={<Documents />} />
              <Route path="profile" element={<Profile />} />
              <Route path="update/:id" element={<UpdateDocument />} />
              <Route path="editprofile" element={<EditProfile />} /> */}
              {/* Catch all unmatched nested routes */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          {/* Catch all unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </MainLayout>
    </>
  );
}

export default App;
