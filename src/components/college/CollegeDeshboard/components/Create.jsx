import { useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { departmentCourses } from "../../../PaperDetails";

const Create = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [paperName, setPaperName] = useState("");
  const [collegeName, setcollegeName] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // ✅ Year dropdown range
  const minYear = 2015;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - minYear + 1 },
    (_, i) => minYear + i
  );

  // ✅ Get courses dynamically from department
  const allCourses =
    departmentCourses.find((d) => d.department === department)?.courses || [];

  // ✅ Get total semesters dynamically from selected course
  const totalSemesters =
    allCourses.find((c) => c.name === course)?.semesters || 0;

  // ✅ Handle form submission
  const formSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (decoded.role === "admin") {
      formData.append("paperName", paperName);
      formData.append("year", year);
      formData.append("semester", semester);
      formData.append("department", department);
      formData.append("course", course);
      formData.append("description", description);
      formData.append("file", file);
      formData.append("collegeName", collegeName);
    } else {
      formData.append("paperName", paperName);
      formData.append("year", year);
      formData.append("semester", semester);
      formData.append("department", department);
      formData.append("course", course);
      formData.append("description", description);
      formData.append("file", file);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_URI_COLLEGE}/create-document`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Something went wrong");

      toast.success(result.message || "Document uploaded successfully!");

      // Reset form
      setPaperName("");
      setcollegeName("");
      setYear("");
      setDepartment("");
      setCourse("");
      setSemester("");
      setDescription("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      <h1 className="text-xl font-bold mb-4 text-white">Create Paper</h1>

      <form className="space-y-4" onSubmit={formSubmit}>
        {/* Paper Name + Year Dropdown */}
        <div className="flex space-x-8">
          <input
            value={paperName}
            onChange={(e) => setPaperName(e.target.value)}
            type="text"
            placeholder="Enter Paper Name"
            className="w-full border px-4 py-2 rounded"
            required
            disabled={loading}
          />
          {decoded.role === "admin" ? (
            <>
              <input
                value={collegeName}
                onChange={(e) => setcollegeName(e.target.value)}
                type="text"
                placeholder="Enter College Name"
                className="w-full border px-4 py-2 rounded"
                required
                disabled={loading}
              />
            </>
          ) : (
            <></>
          )}
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border px-4 py-2 rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          >
            <option value="">-- Select Year --</option>
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Department + Course */}
        <div className="flex space-x-8">
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setCourse("");
              setSemester("");
            }}
            className="border border-gray-300 px-4 py-2 rounded w-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          >
            <option value="">-- Select Department --</option>
            {departmentCourses.map((dep) => (
              <option key={dep.department} value={dep.department}>
                {dep.department}
              </option>
            ))}
          </select>

          <select
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setSemester("");
            }}
            className="border border-gray-300 px-4 py-2 rounded w-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!department || loading}
          >
            <option value="">-- Select Course --</option>
            {allCourses.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Semester + File */}
        <div className="flex space-x-8">
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!course || loading}
          >
            <option value="">-- Select Semester --</option>
            {Array.from({ length: totalSemesters }, (_, i) => i + 1).map(
              (sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              )
            )}
          </select>

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border px-4 py-2 rounded h-12 bg-white"
            required
            disabled={loading}
          />
        </div>

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Description"
          className="w-full border px-4 py-2 rounded resize-none"
          disabled={loading}
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Create;
