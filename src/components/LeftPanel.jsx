import React, { useState } from "react";

export default function LeftPanel({ onVisualize, onClear }) {
  const [input, setInput] = useState(
    JSON.stringify(
      {
        user: {
          id: 1,
          name: "Raj",
          address: { city: "Hyderabad", country: "INDIA" },
          items: [{ name: "Laptap" }, { name: "Smartphone" }],
        },
      },
      null,
      4
    )
  );
  const [error, setError] = useState("");

  const handleVisualize = () => {
    try {
      const json = JSON.parse(input);
      setError("");
      onVisualize(json);
    } catch {
      setError("Invalid JSON format. Please check and try again.");
    }
  };

  const handleClear = () => {
    setInput("");
    setError("");
    onClear();
  };

  return (
    <div className="flex flex-col w-full h-[670px]">
      <label className="text-gray-700 dark:text-gray-200 mb-3 font-semibold text-base">
        Paste or type JSON data
      </label>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck="false"
        className="font-[IBM Plex Mono] text-[15px] flex-1 rounded-lg border border-gray-300 bg-white dark:border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-800 text-gray-700 dark:text-gray-100 tracking-[0.02em] leading-[1.7]"
        style={{
          fontVariantLigatures: "none",
          tabSize: 4,
          whiteSpace: "pre",
        }}
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleVisualize}
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white text-md py-2.5 rounded-lg transition-all w-[160px]"
        >
          Generate Tree
        </button>

        <button
          onClick={handleClear}
          className="bg-gray-400 hover:bg-gray-500 cursor-pointer text-white text-md py-2.5 rounded-lg transition-all w-[120px]"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
