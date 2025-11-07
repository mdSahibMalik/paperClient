const Dropdown = () => {
  return ( 
    <div className="p-4 bg-slate-900 text-white w-full ">
      <div className="flex justify-between flex-wrap gap-x-[2.5%] "> {/* 4x 20% + 3x 2.5% gaps = 100% */}
        {/* Dropdown 1 */}
        <div className="basis-[20%]">
          <label htmlFor="year" className="block mr-2 mb-1 text-md font-medium">
            Search By Year : 
          </label>
          <select
            id="year"
            className="bg-slate-800 text-white border border-slate-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56" 
          >
            <option value="">-- Select by Course --</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>

        {/* Dropdown 2 */}
        <div className="basis-[20%]">
          <label htmlFor="category" className="block mr-2 mb-1 text-md font-medium">
           Search By Course :          </label>
          <select
            id="category"
            className="bg-slate-800 text-white border border-slate-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
          >
            <option value="">-- Select by Course --</option>
            <option value="tech">Tech</option>
            <option value="finance">Finance</option>
            <option value="health">Health</option>
          </select>
        </div>

        {/* Dropdown 3 */}
        <div className="basis-[20%]">
          <label htmlFor="status" className="block mr-2 mb-1 text-md font-medium">
            Search By Department : 
          </label>
          <select
            id="status"
            className="bg-slate-800 text-white border border-slate-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
          >
            <option value="">-- Select by Department --</option>
            <option value="Active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Dropdown 4 */}
        <div className="basis-[20%]">
          <label htmlFor="sort" className="block mr-2 mb-1 text-md font-medium">
            Select Semester : 
          </label>
          <select
            id="sort"
            className="bg-slate-800 text-white border border-slate-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
          >
            <option value="">-- Select by Department --</option>
            <option value="even">Even</option>
            <option value="odd">Odd</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
