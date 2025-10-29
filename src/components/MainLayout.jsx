import React, { useState } from "react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

export default function MainLayout() {
  const [parsedJson, setParsedJson] = useState(null);

  const handleVisualize = (data) => {
    setParsedJson(data);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };
  const handleClear = () => {
    setJsonData(null); // 🔥 Clears JSON Tree visualization
  };

  return (
    <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-stretch mx-auto">
      <div className="flex flex-col md:flex-row w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* LEFT PANEL */}
        <div className="flex flex-col w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            JSON Tree Visualizer
          </h1>
          <LeftPanel onVisualize={handleVisualize} />
        </div>

        {/* RIGHT PANEL (Search + TreeVisualizer) */}
        <div className="flex flex-col w-full md:w-1/2 p-6">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Dark / Light
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={toggleTheme}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-[3px] top-[3px] bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>

          {/* ✅ Pass JSON data to RightPanel */}
          <RightPanel jsonData={parsedJson} />
        </div>
      </div>
    </div>
  );
}
