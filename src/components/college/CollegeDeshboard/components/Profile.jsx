import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_LOCAL_URI_COLLEGE}/profile`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          toast.error(data.message || "Could not fetch user data");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
          {user.collegeName.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">
            {user.collegeName}
          </h1>
          <p className="text-gray-500">{user.role.toUpperCase()}</p>
          {user.isVerified && (
            <span className="mt-1 inline-block px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
              Verified
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-gray-700 font-medium mb-1">Email</h2>
          <p className="text-gray-900">{user.email}</p>
        </div>
        <div>
          <h2 className="text-gray-700 font-medium mb-1">Phone</h2>
          <p className="text-gray-900">{user.phone}</p>
        </div>
        <div>
          <h2 className="text-gray-700 font-medium mb-1">ID</h2>
          <p className="text-gray-900">{user._id}</p>
        </div>
        <div>
          <h2 className="text-gray-700 font-medium mb-1">Role</h2>
          <p className="text-gray-900">{user.role}</p>
        </div>
      </div>

      <div className="mt-6">
        <Link to={"/college-dashboard/editprofile"}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
