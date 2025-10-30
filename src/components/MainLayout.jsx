import React, { useEffect, useState } from "react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

export default function MainLayout() {
  const [parsedJson, setParsedJson] = useState(null);
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

  const handleVisualize = (data) => setParsedJson(data);
  const handleClear = () => setParsedJson(null);

  return (
    <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-stretch mx-auto">
      <div className="flex flex-col md:flex-row w-full bg-white  rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
        <div className="flex flex-col w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] bg-clip-text text-transparent">
            JSON Tree Visualizer
          </h1>

          <LeftPanel onVisualize={handleVisualize} onClear={handleClear} />
        </div>

        <div className="flex flex-col w-full md:w-1/2 p-6">
          <RightPanel jsonData={parsedJson} />
        </div>
      </div>
    </div>
  );
}
