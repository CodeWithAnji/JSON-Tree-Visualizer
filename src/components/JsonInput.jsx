import React, { useState } from "react";

export default function JsonInput({ onVisualize }) {
  const [input, setInput] = useState(
    JSON.stringify(
      {
        user: {
          id: 1,
          name: "John Doe",
          address: { city: "New York", country: "USA" },
          items: [{ name: "item1" }, { name: "item2" }],
        },
      },
      null,
      2
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

  return (
    <div className="flex flex-col w-full md:w-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
      <label className="text-gray-700 dark:text-gray-200 mb-2 font-medium">
        Paste or type JSON data
      </label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={16}
        spellCheck="false"
        className="font-mono text-sm rounded-lg border border-gray-300 dark:border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        onClick={handleVisualize}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
      >
        Generate Tree
      </button>
    </div>
  );
}
