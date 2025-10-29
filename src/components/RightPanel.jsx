import React, { useState } from "react";
import TreeVisualizer from "./TreeVisualizer"; // ✅ Import your visualizer

export default function RightPanel({ jsonData }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
    } else {
      console.log("Please enter a valid JSON path");
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Search Input Section */}
      <label className="text-gray-700 dark:text-gray-200 mb-3 font-semibold text-base">
        Search by JSON Path
      </label>

      <div className="flex w-full mb-4">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="$.user.address.city"
          className="flex-1 text-sm border p-2 border-gray-300 text-gray-800"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-r-md transition-colors"
        >
          Search
        </button>
      </div>

      {/* ✅ TreeVisualizer below search */}
      <div className="w-full">
        <TreeVisualizer jsonData={jsonData} />
      </div>
    </div>
  );
}
