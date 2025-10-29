import React, { useEffect, useState, useCallback, useMemo } from "react";
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

  // Build nodes and edges from JSON
  useEffect(() => {
    if (!jsonData || typeof jsonData !== "object") {
      setRawNodes([]);
      setRawEdges([]);
      return;
    }

    try {
      const { nodes: builtNodes, edges: builtEdges } = buildNodesEdges(
        jsonData,
        "root"
      );
      setRawNodes(builtNodes);
      setRawEdges(builtEdges);
      setError(null);
    } catch (err) {
      console.error("Error building tree:", err);
      setError(err.message);
      setRawNodes([]);
      setRawEdges([]);
    }
  }, [jsonData]);

  // Highlight search result
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

  // Styling with highlight
  const nodes = useMemo(
    () =>
      rawNodes.map((node) => ({
        ...node,
        style: {
          ...node.style,
          border:
            node.id === highlightedNodeId
              ? "2px solid #FFD700"
              : "1px solid rgba(255,255,255,0.3)",
          boxShadow:
            node.id === highlightedNodeId
              ? "0 0 10px 3px #FFD700"
              : "0 2px 6px rgba(0,0,0,0.15)",
          cursor: "pointer",
        },
      })),
    [rawNodes, highlightedNodeId]
  );

  if (error) {
    return (
      <div className="h-[600px] flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!jsonData) {
    return (
      <div className="h-[600px] flex items-center justify-center text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px]">
      {/* Custom Zoom Controls */}
      {/* Custom Zoom Controls */}
      <div
        className="absolute top-3 right-3 flex flex-col bg-white/90 dark:bg-gray-900/90 
                backdrop-blur-md rounded-xl shadow-lg border border-gray-200 
                dark:border-gray-700 z-20 overflow-hidden"
      >
        <button
          onClick={() => zoomIn()}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
               hover:bg-blue-500 hover:text-white transition-colors duration-200 border-b 
               border-gray-200 dark:border-gray-700 cursor-pointer "
        >
          Zoom In
        </button>

        <button
          onClick={() => zoomOut()}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
               hover:bg-blue-500 hover:text-white transition-colors duration-200 border-b 
               border-gray-200 dark:border-gray-700"
        >
          Zoom Out
        </button>

        <button
          onClick={() => fitView({ padding: 0.2, duration: 400 })}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
               hover:bg-green-500 hover:text-white transition-colors duration-200"
        >
          Fit View
        </button>
      </div>

      {/* Tooltip for node hover */}
      {hoveredNode && (
        <div
          className="absolute bg-gray-900 text-white text-xs p-2 rounded shadow-lg z-20"
          style={{
            top: hoveredNode.y + 20,
            left: hoveredNode.x + 20,
            pointerEvents: "none",
          }}
        >
          <div>
            <b>Path:</b> {hoveredNode.data.path}
          </div>
          {"value" in hoveredNode.data && (
            <div>
              <b>Value:</b> {String(hoveredNode.data.value)}
            </div>
          )}
        </div>
      )}

      {/* React Flow Graph */}
      <ReactFlow
        nodes={nodes}
        edges={rawEdges}
        fitView
        nodesDraggable={false}
        panOnDrag={true}
        zoomOnScroll={true}
        onNodeMouseEnter={(_, node) =>
          setHoveredNode({ ...node, x: node.position.x, y: node.position.y })
        }
        onNodeMouseLeave={() => setHoveredNode(null)}
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
    <div className="w-full h-[600px] bg-white dark:bg-gray-900 rounded-md p-2 border border-gray-300">
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
