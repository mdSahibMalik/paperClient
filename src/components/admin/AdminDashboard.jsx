import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 text-white shadow-md p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="colleges"
            className={({ isActive }) =>
              `text-left px-4 py-2 rounded hover:bg-slate-500 hover:text-black ${
                isActive ? "bg-blue-500 text-white" : ""
              }`
            }
          >
            Registered College
          </NavLink>

          <NavLink
            to="/college-dashboard"
            className={({ isActive }) =>
              `text-left px-4 py-2 rounded hover:bg-slate-500 hover:text-black ${
                isActive ? "bg-blue-500 text-white" : ""
              }`
            }
          >
            College Dashboard
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-left px-4 py-2 rounded hover:bg-slate-500 hover:text-black ${
                isActive ? "bg-blue-500 text-white" : ""
              }`
            }
          >
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Workspace */}
      <div className="flex-1 p-10 transition-all duration-300 ease-in-out">
        <div className="bg-slate-950 text-white rounded shadow-md p-6 min-h-[400px] transition-all">
          {/* Nested route components will render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

