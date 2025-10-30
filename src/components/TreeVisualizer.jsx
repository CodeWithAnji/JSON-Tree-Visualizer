import React, { useEffect, useState, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import buildNodesEdges from "../utils/treeBuilder";

function TreeCanvas({ jsonData, searchPath, onSearchResult }) {
  const [rawNodes, setRawNodes] = useState([]);
  const [rawEdges, setRawEdges] = useState([]);
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [error, setError] = useState(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  useEffect(() => {
    if (!jsonData || Object.keys(jsonData).length === 0) {
      setRawNodes([]);
      setRawEdges([]);
      return;
    }

    try {
      const { nodes, edges } = buildNodesEdges(jsonData, "root");
      setRawNodes(nodes);
      setRawEdges(edges);
      setError(null);
    } catch (err) {
      console.error("Error building tree:", err);
      setError(err.message);
      setRawNodes([]);
      setRawEdges([]);
    }
  }, [jsonData]);

  useEffect(() => {
    if (!searchPath) {
      setHighlightedNodeId(null);
      onSearchResult?.(null);
      return;
    }

    const match = rawNodes.find((n) => n.data.path === searchPath);
    if (match) {
      setHighlightedNodeId(match.id);
      fitView({ nodes: [match], padding: 0.4, duration: 400 });
      onSearchResult?.(true);
    } else {
      setHighlightedNodeId(null);
      onSearchResult?.(false);
    }
  }, [searchPath, rawNodes, fitView, onSearchResult]);

  const nodes = useMemo(
    () =>
      rawNodes.map((node) => ({
        ...node,
        style: {
          ...node.style,
          border:
            node.id === highlightedNodeId
              ? "2px solid #FF0000"
              : "1px solid rgba(255,255,255,0.3)",
          boxShadow:
            node.id === highlightedNodeId
              ? "0 0 10px 3px rgba(255, 0, 0, 0.8)"
              : "0 2px 6px rgba(0,0,0,0.15)",
          cursor: "pointer",
        },
      })),
    [rawNodes, highlightedNodeId]
  );

  if (!jsonData || Object.keys(jsonData).length === 0) {
    return (
      <div className="h-[600px] flex items-center justify-center text-gray-400 dark:text-gray-500 transition-colors">
        No data to display
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] flex items-center justify-center text-red-600 dark:text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] transition-colors duration-300">
      <div className="absolute top-3 right-3 flex flex-col bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
        <button
          onClick={() => zoomIn()}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-colors duration-200 border-b border-gray-200 dark:border-gray-700"
        >
          Zoom In
        </button>

        <button
          onClick={() => zoomOut()}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-colors duration-200 border-b border-gray-200 dark:border-gray-700"
        >
          Zoom Out
        </button>

        <button
          onClick={() => fitView({ padding: 0.2, duration: 400 })}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-green-500 hover:text-white transition-colors duration-200"
        >
          Fit View
        </button>
      </div>

      <ReactFlow
        key={JSON.stringify(jsonData)}
        nodes={nodes}
        edges={rawEdges}
        fitView
        nodesDraggable={false}
        panOnDrag={true}
        zoomOnScroll={true}
      >
        <Background gap={16} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default function TreeVisualizer({
  jsonData,
  searchPath,
  onSearchResult,
}) {
  return (
    <div className="w-full h-[600px] bg-white dark:bg-gray-900 rounded-md p-2 border border-gray-300 dark:border-gray-700 transition-colors duration-300">
      <ReactFlowProvider>
        <TreeCanvas
          jsonData={jsonData}
          searchPath={searchPath}
          onSearchResult={onSearchResult}
        />
      </ReactFlowProvider>
    </div>
  );
}
