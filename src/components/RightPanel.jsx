import React, { useState } from "react";
import TreeVisualizer from "../components/TreeVisualizer";

export default function RightPanel({ jsonData }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchPath, setSearchPath] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      setSearchPath(searchValue.trim());
      setMessage("Searching...");
    } else {
      setMessage("Please enter a valid JSON path");
    }
  };

  const handleSearchResult = (found) => {
    if (found === true) setMessage("✅ Match found");
    else if (found === false) setMessage("❌ No match found");
    else setMessage("");
  };

  return (
    <div className="flex flex-col w-full">
      {/* Search Bar */}
      <label className="text-gray-700 dark:text-gray-200 mb-3 font-semibold text-base">
        Search by JSON Path
      </label>

      <div className="flex w-full mb-3">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="$.user.address.city"
          className="flex-1 text-sm border p-2 border-gray-300 text-gray-800"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-r-md transition-colors cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`text-sm mb-3 italic ${
            message.includes("✅")
              ? "text-green-600"
              : message.includes("❌")
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {message}
        </div>
      )}

      {/* JSON Tree */}
      <TreeVisualizer
        jsonData={jsonData}
        searchPath={searchPath}
        onSearchResult={handleSearchResult}
      />
    </div>
  );
}
