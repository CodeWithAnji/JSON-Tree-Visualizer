import React from "react";
import Header from "./components/Header";
import JsonInput from "./components/JsonInput";

export default function App() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center p-8">
      <div className="w-full max-w-6xl">
        <Header onToggleTheme={toggleTheme} />
        <div className="flex flex-col md:flex-row gap-8">
          <JsonInput />
        </div>
      </div>
    </div>
  );
}
