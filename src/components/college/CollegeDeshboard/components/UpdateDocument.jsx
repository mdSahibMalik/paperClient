import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateDocument() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    year: "",
    paperName: "",
    course: "",
    department: "",
    fileUrl: "",
  });

  const [newFile, setNewFile] = useState(null); // To hold newly selected file
  const [removeOldFile, setRemoveOldFile] = useState(false); // Track if user removes existing file

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_LOCAL_URI_COLLEGE}/getPaper/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch paper data");
        return res.json();
      })
      .then((data) => {
        setFormData(data.paper);
      })
      .catch((err) => {
        setError("Error fetching data");
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setRemoveOldFile(true);
    setFormData({ ...formData, fileUrl: "" });
    setNewFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formPayload = new FormData();
    formPayload.append("year", formData.year);
    formPayload.append("paperName", formData.paperName);
    formPayload.append("course", formData.course);
    formPayload.append("department", formData.department);

    if (newFile) {
      formPayload.append("file", newFile);
    }

    // Optional: tell backend to delete old file
    formPayload.append("removeOldFile", removeOldFile);

    fetch(`${import.meta.env.VITE_LOCAL_URI_COLLEGE}/updatePaper/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formPayload,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        setLoading(false);
        navigate("/college/dashboard/documents");
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to update paper");
        console.error(err);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-black">
      <h2 className="text-2xl mb-4 font-semibold">Update Paper</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="paperName"
          value={formData.paperName}
          onChange={handleChange}
          placeholder="Paper Name"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="w-full border px-3 py-2 rounded"
        />

        {/* FILE SECTION */}
        <div className="w-full bg-white border px-3 py-2 rounded flex justify-between items-center">
          {!removeOldFile && formData.fileUrl ? (
            <div className="flex justify-between w-full items-center">
              <a
                href={formData.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline break-all"
              >
                View Current File
              </a>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-600 font-bold ml-4"
                title="If you want to upload a new file, remove the old one first"
              >
                ❌ Remove
              </button>
            </div>
          ) : (
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 w-full font-semibold text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Paper"}
        </button>
      </form>
    </div>
  );
}

export default UpdateDocument;
