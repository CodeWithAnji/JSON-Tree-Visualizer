import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import buildNodesEdges from "../utils/treeBuilder";
import "reactflow/dist/style.css";

export default function TreeVisualizer({ jsonData }) {
  const [rawNodes, setRawNodes] = useState([]);
  const [rawEdges, setRawEdges] = useState([]);

  useEffect(() => {
    if (!jsonData) {
      setRawNodes([]);
      setRawEdges([]);
      return;
    }

    const { nodes: builtNodes, edges: builtEdges } = buildNodesEdges(
      jsonData,
      "root"
    );
    const offsetX = 60;
    const offsetY = 40;
    const adjustedNodes = builtNodes.map((n) => ({
      ...n,
      position: { x: n.position.x + offsetX, y: n.position.y + offsetY },
    }));

    setRawNodes(adjustedNodes);
    setRawEdges(builtEdges);
  }, [jsonData]);

  // ✅ Memoize to avoid React Flow warning
  const nodes = useMemo(() => rawNodes, [rawNodes]);
  const edges = useMemo(() => rawEdges, [rawEdges]);

  const onInit = useCallback((instance) => {
    setTimeout(() => instance.fitView({ padding: 0.12 }), 150);
  }, []);

  if (!jsonData) {
    return (
      <div className="h-[600px] flex items-center justify-center text-gray-400 border border-gray-300 rounded-md">
        No results to Display
      </div>
    );
  }

  return (
    // ✅ Ensure parent container has explicit width & height
    <div className="w-full h-[600px] bg-white dark:bg-gray-900 rounded-md p-2 border border-gray-300">
      <ReactFlow nodes={nodes} edges={edges} onInit={onInit} fitView>
        <Background gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
