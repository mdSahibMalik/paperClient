import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function RegisteredColleges() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'pending', 'verified'

  // 🧠 Filtering logic
  const filteredRequests = requests.filter((req) => {
    const matchesSearch = req.collegeName
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ? true : req.isVerifiedByAdmin === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // 🧩 Handlers
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleFilterChange = (status) => setFilterStatus(status);
  const handleAction = async (id, action) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_LOCAL_URI_ADMIN}/verify-users`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: action,
            userId: id,
          }),
        }
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      toast.success(data.message || "Update successful!");
      fetchData();
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmDelete) return;

      const reason = window.prompt(
        "Please provide a reason for deleting this user:"
      );
      if (!reason) return toast.info("Deletion cancelled — reason required");
      const res = await fetch(
        `${import.meta.env.VITE_LOCAL_URI_ADMIN}/delete-users/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reason,
          }),
        }
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      toast.success(data.message || "Delete successful!");
      fetchData();
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to delete user");
    }
  };
  // ✅ Fetch all data from backend
  const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);

    const res = await fetch(
      `${import.meta.env.VITE_LOCAL_URI_ADMIN}/registered-colleges`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    setRequests(data.requests);
  } catch (err) {
    console.error("Fetch error:", err);
    setError("Failed to load data");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* 🧭 Navbar / Filter UI */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-300">
        <input
          type="text"
          placeholder="🔍 Search by college name..."
          value={search}
          onChange={handleSearchChange}
          className="px-3 py-2 border rounded-md w-1/3 focus:outline-none focus:ring focus:ring-indigo-300"
        />

        <div className="space-x-2">
          <button
            onClick={() => handleFilterChange("pending")}
            className={`px-4 py-2 rounded-md ${
              filterStatus === "pending"
                ? "bg-yellow-400 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-yellow-200"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => handleFilterChange("verified")}
            className={`px-4 py-2 rounded-md ${
              filterStatus === "verified"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-green-200"
            }`}
          >
            Verified
          </button>

          <button
            onClick={() => handleFilterChange("all")}
            className={`px-4 py-2 rounded-md ${
              filterStatus === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-200"
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* 🧾 TABLE */}
      <div className="p-4">
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-[18px]">
                <th className="w-[70px] px-2 py-2 border-r">Sr No.</th>
                <th className="w-[200px] px-4 py-2 border-r">College Name</th>
                <th className="w-[200px] px-4 py-2 border-r">Email</th>
                <th className="w-[200px] px-4 py-2 border-r">Phone</th>
                <th className="w-[150px] px-4 py-2 border-r">Role</th>
                <th className="w-[250px] px-4 py-2 border-r">Verified</th>
                <th className="w-[250px] px-4 py-2 border-r">
                  Verified By Admin
                </th>
                <th className="w-[250px] px-4 py-2 border-r">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-800 text-[16px] text-center">
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((data, index) => (
                  <tr
                    key={data.id || index}
                    className="border-t border-gray-300"
                  >
                    <td className="px-2 py-2 border-r">{index + 1}</td>
                    <td className="px-4 py-2 border-r">{data.collegeName}</td>
                    <td className="px-4 py-2 border-r">{data.email}</td>
                    <td className="px-4 py-2 border-r">{data.phone}</td>
                    <td className="px-4 py-2 border-r">{data.role}</td>

                    <td className="py-2 border-r px-0">
                      {data.isVerified ? "✅ Verified" : "❌ UnVerified"}
                    </td>

                    <td className="px-0 py-2 border-r">
                      {data.isVerifiedByAdmin === "verified" ? (
                        <span className=" text-green-800 rounded-full">
                          ✅ {data.isVerifiedByAdmin}
                        </span>
                      ) : (
                        <span className=" text-yellow-800 rounded-full p-0">
                          ⏳ {data.isVerifiedByAdmin}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-2 border-r flex space-x-2 justify-center">
                      {data.isVerifiedByAdmin === "pending" ? (
                        <>
                          <button
                            className="inline-block bg-blue-600 w-24 p-1 text-white text-[16px] rounded-md hover:bg-indigo-700"
                            onClick={() => handleAction(data._id, "verified")}
                          >
                            Verify<i className="fa-solid fa-check ml-1"></i>
                          </button>
                          <button
                            className="inline-block bg-red-600 w-24 p-1 text-white text-[16px] rounded-md hover:bg-red-700"
                            onClick={() => handleAction(data._id, "rejected")}
                          >
                            Reject<i className="fa-solid fa-xmark ml-1"></i>
                          </button>
                        </>
                      ) : (
                        <button
                          className="inline-block bg-red-600 w-24 p-1 text-white text-[16px] rounded-md hover:bg-red-700"
                          onClick={() => handleDelete(data._id)}
                        >
                          Delete<i className="fa-solid fa-trash ml-1"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RegisteredColleges;
