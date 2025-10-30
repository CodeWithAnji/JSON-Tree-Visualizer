// src/components/ThemeToggle.jsx
import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600 dark:text-gray-300 text-sm">
        {darkMode ? "Dark Mode" : "Light Mode"}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleTheme}
          className="sr-only peer"
        />
        <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
        <div className="absolute left-[3px] top-[3px] bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
}
