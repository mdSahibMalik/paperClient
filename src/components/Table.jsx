import React, { useEffect, useState } from "react";
import { departmentCourses } from "./PaperDetails";

function Table() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // ✅ for filtered view
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filtering states
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  // ✅ Fetch all data from backend
  const fetchData = () => {
    setLoading(true);
    setError(null);
    fetch(`${import.meta.env.VITE_LOCAL_URI_USER}/papers`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setTableData(data.paper);
        setFilteredData(data.paper); // initially show all
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Apply filters whenever a dropdown changes
  useEffect(() => {
    let filtered = tableData;

    if (selectedYear)
      filtered = filtered.filter(
        (item) => item.year?.toString() === selectedYear.toString()
      );

    if (selectedDepartment)
      filtered = filtered.filter(
        (item) => item.department === selectedDepartment
      );

    if (selectedCourse)
      filtered = filtered.filter((item) => item.course === selectedCourse);

    if (selectedSemester)
      filtered = filtered.filter(
        (item) => item.semester?.toString() === selectedSemester.toString()
      );

    setFilteredData(filtered);
  }, [selectedYear, selectedDepartment, selectedCourse, selectedSemester, tableData]);

  // ✅ Dropdown setup
  const startYear = 2015;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

  const allCourses =
    departmentCourses.find((d) => d.department === selectedDepartment)?.courses || [];

  const handleYear = (e) => setSelectedYear(e.target.value);
  const handleDepartment = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedCourse("");
    setSelectedSemester("");
  };
  const handleCourse = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedSemester("");
  };
  const handleSemester = (e) => setSelectedSemester(e.target.value);

  return (
    <>
      {/* FILTER BAR */}
      <div className="p-4 bg-slate-900 text-white w-full">
        <div className="flex justify-between flex-wrap gap-x-[2.5%]">
          {/* Year Dropdown */}
          <div className="basis-[20%]">
            <label htmlFor="year" className="block mb-1 text-md font-medium">
              Search By Year:
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYear}
              className="bg-slate-800 text-white border border-slate-600 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 w-56"
            >
              <option value="">-- Select Year --</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="basis-[20%]">
            <label htmlFor="department" className="block mb-1 text-md font-medium">
              Search By Department:
            </label>
            <select
              id="department"
              value={selectedDepartment}
              onChange={handleDepartment}
              className="bg-slate-800 text-white border border-slate-600 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 w-56"
            >
              <option value="">-- Select Department --</option>
              {departmentCourses.map((d) => (
                <option key={d.department} value={d.department}>
                  {d.department}
                </option>
              ))}
            </select>
          </div>

          {/* Course Dropdown */}
          <div className="basis-[20%]">
            <label htmlFor="course" className="block mb-1 text-md font-medium">
              Search By Course:
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={handleCourse}
              disabled={!selectedDepartment}
              className="bg-slate-800 text-white border border-slate-600 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 w-56"
            >
              <option value="">-- Select Course --</option>
              {allCourses.map((course) => (
                <option key={course.name} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown */}
          <div className="basis-[20%]">
            <label htmlFor="semester" className="block mb-1 text-md font-medium">
              Select Semester:
            </label>
            <select
              id="semester"
              value={selectedSemester}
              onChange={handleSemester}
              disabled={!selectedCourse}
              className="bg-slate-800 text-white border border-slate-600 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 w-56"
            >
              <option value="">-- Select Semester --</option>
              {(() => {
                const selectedDept = departmentCourses.find(
                  (d) => d.department === selectedDepartment
                );
                const selectedCourseObj = selectedDept?.courses.find(
                  (c) => c.name === selectedCourse
                );
                const totalSemesters = selectedCourseObj?.semesters || 0;

                return Array.from({ length: totalSemesters }, (_, i) => i + 1).map(
                  (sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  )
                );
              })()}
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="p-4">
        {error && <p className="text-red-600 mb-2 ">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-[18px]">
                <th className="w-[70px] px-2 py-2 border-r">Sr No.</th>
                <th className="w-[150px] px-2 py-2 border-r">Year</th>
                <th className="w-[200px] px-4 py-2 border-r">Paper Name</th>
                <th className="w-[200px] px-4 py-2 border-r">Course</th>
                <th className="w-[200px] px-4 py-2 border-r">Department</th>
                <th className="w-[150px] px-4 py-2 border-r">Semester</th>
                <th className="w-[250px] px-4 py-2 border-r">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-[16px] text-center">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <tr key={data.id || index} className="border-t border-gray-300">
                    <td className="px-2 py-2 border-r">{index + 1}</td>
                    <td className="px-2 py-2 border-r">{data.year}</td>
                    <td className="px-4 py-2 border-r">{data.paperName}</td>
                    <td className="px-4 py-2 border-r">{data.course}</td>
                    <td className="px-4 py-2 border-r">{data.department}</td>
                    <td className="px-4 py-2 border-r">{data.semester}</td>
                    <td className="px-4 py-2 border-r space-x-2">
                      <a
                        href={data.fileUrl?.replace(
                          "/upload/",
                          "/upload/fl_attachment/"
                        )}
                        download
                      >
                        <button className="inline-block bg-blue-600 px-3 py-2 text-white text-[16px] rounded-md hover:bg-indigo-700">
                          Download<i className="fa-solid fa-download ml-1"></i>
                        </button>
                      </a>
                      <a
                        href={data.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="inline-block bg-green-600 px-3 py-2 text-white text-[16px] rounded-md hover:bg-green-700">Open
                         <i className="fa-solid fa-right-to-bracket ml-1"></i>
                        </button>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
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

export default Table;
