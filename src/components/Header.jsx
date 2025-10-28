import React from "react";

export default function Header({ onToggleTheme }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        JSON Tree Visualizer
      </h1>
      <div className="flex items-center gap-2">
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          Dark/Light
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            onChange={onToggleTheme}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors"></div>
          <div className="absolute left-[3px] top-[3px] bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
        </label>
      </div>
    </div>
  );
}
