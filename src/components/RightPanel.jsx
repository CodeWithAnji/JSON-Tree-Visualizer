import React, { useState, useRef } from "react";
import TreeVisualizer from "../components/TreeVisualizer";
import * as htmlToImage from "html-to-image";

export default function RightPanel({ jsonData }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchPath, setSearchPath] = useState("");
  const [message, setMessage] = useState("");
  const treeRef = useRef(null); // reference to tree container

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

  const handleDownloadImage = async () => {
    if (!treeRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(treeRef.current);
      const link = document.createElement("a");
      link.download = "json-tree.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image:", err);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      <label className="text-gray-700 dark:text-gray-200 mb-2 font-semibold text-base">
        Search by JSON Path
      </label>

      {/* Search bar and Download button on same row */}
      <div className="flex items-center w-full mb-4">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="$.user.address.city"
          className="flex-1 text-sm border p-2 border-gray-300 text-gray-800 rounded-l-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 transition-colors cursor-pointer"
        >
          Search
        </button>

        {jsonData && (
          <button
            onClick={handleDownloadImage}
            className="ml-3 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md shadow-md transition-all"
          >
            Download
          </button>
        )}
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
      <div ref={treeRef} className="flex-1">
        <TreeVisualizer
          jsonData={jsonData}
          searchPath={searchPath}
          onSearchResult={handleSearchResult}
        />
      </div>
    </div>
  );
}
