import React from "react";
import { jwtDecode } from "jwt-decode";
import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 text-white shadow-md p-5">
        <h2 className="text-2xl font-bold mb-6">College Panel</h2>
        <nav className="flex flex-col space-y-4">
          {decoded.role === "college" ? (
            <>
              <NavLink
                to="create"
                className={({ isActive }) =>
                  `text-left px-4 py-2 rounded hover:bg-slate-500 hover:text-black ${
                    isActive ? "bg-blue-500 text-white" : ""
                  }`
                }
              >
                Create
              </NavLink>

              <NavLink
                to="documents"
                className={({ isActive }) =>
                  `text-left px-4 py-2 rounded hover:bg-slate-500 hover:text-black ${
                    isActive ? "bg-blue-500 text-white" : ""
                  }`
                }
              >
                Documents
              </NavLink>

              <NavLink
                to="profile"
                className={({ isActive }) =>
                  `text-left px-4 py-2 rounded hover:bg-slate-500 hover:text-black ${
                    isActive ? "bg-blue-500 text-white" : ""
                  }`
                }
              >
                Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="create"
                className={({ isActive }) =>
                  `text-left px-4 py-2 rounded hover:bg-slate-500 hover:text-black ${
                    isActive ? "bg-blue-500 text-white" : ""
                  }`
                }
              >
                Upload Paper
              </NavLink>

              <NavLink
                to="documents"
                className={({ isActive }) =>
                  `text-left px-4 py-2 rounded hover:bg-slate-500 hover:text-black ${
                    isActive ? "bg-blue-500 text-white" : ""
                  }`
                }
              >
                All Papers
              </NavLink>
            </>
          )}
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

export default Dashboard;
