import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Documents = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    fetch(`${import.meta.env.VITE_LOCAL_URI_COLLEGE}/getPaper`, {
      method: "GET",
      credentials: "include", // important to send cookies
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");

        return res.json();
      })
      .then((data) => {
        setTableData(data.user);
        setLoading(false);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  //! handle delete function
  const handleDelete = async (e, id) => {
    e.preventDefault(); // Prevent navigation if wrapped in a Link

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirmDelete) return;

    try {
      // Example: call your delete API with file ID
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_URI_COLLEGE}/deletePaper/${id}`,
        {
          method: "DELETE",
          credentials: "include", // important to send cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }
      toast.success("File deleted successfully!");
      setTableData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Something went wrong while deleting the file.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-[18px] ">
              <th className="w-[70px] px-2 py-2 border-r border-gray-300">
                Sr No.
              </th>
              <th className="w-[250px] px-2 py-2 border-r border-gray-300">
                Year
              </th>
              {decoded.role === "admin" ? (
                <>
                  <th className="w-[300px] px-4 py-2 border-r border-gray-300">
                    College Name
                  </th>
                </>
              ) : (
                <></>
              )}

              <th className="w-[300px] px-4 py-2 border-r border-gray-300">
                Paper Name
              </th>
              <th className="w-[300px] px-4 py-2 border-r border-gray-300">
                Course
              </th>
              <th className="w-[300px] px-4 py-2 border-r border-gray-300">
                Department
              </th>
              <th className="w-[300px] px-4 py-2 border-r border-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-[18px] px-4 text-center">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : tableData.length > 0 ? (
              tableData.map((data, index) => (
                <tr
                  key={data.id || index}
                  className="border-t border-gray-300 text-[18px]"
                >
                  <td className="px-2 py-2 border-r border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-2 py-2 border-r border-gray-300">
                    {data.year}
                  </td>
                  {decoded.role === "admin" ? (
                <>
                  <td className="px-4 py-2 border-r border-gray-300">
                    {data.collegeName}
                  </td>
                </>
              ) : (
                <></>
              )}
                  <td className="px-4 py-2 border-r border-gray-300">
                    {data.paperName}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-300">
                    {data.course}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-300">
                    {data.department}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-300 space-x-2 w-[300px] flex my-auto">
                    <Link to={`/college-dashboard/update/${data._id}`}>
                      <button className="inline-block bg-blue-600 px-3 text-sm py-2 text-white text-[18px] rounded-md hover:bg-indigo-700">
                        Update <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                    <Link to={data.fileUrl} target="_blank">
                      <button className="inline-block bg-blue-600 px-2 py-2 text-sm text-white text-[18px] rounded-md hover:bg-indigo-700">
                        Open &rarr;
                      </button>
                    </Link>
                    <button
                      onClick={(e) => handleDelete(e, data._id)}
                      className="inline-block bg-blue-600 px-3 py-2 text-sm text-white text-[18px] rounded-md hover:bg-indigo-700"
                    >
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;
