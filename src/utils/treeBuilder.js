// src/utils/treeBuilder.js
// Converts JSON into React Flow nodes and edges with colored node types.

function isPrimitive(val) {
  return (
    val === null ||
    typeof val === "string" ||
    typeof val === "number" ||
    typeof val === "boolean"
  );
}

export default function buildNodesEdges(rootJson, rootLabel = "root") {
  const nodes = [];
  const edges = [];

  const horizontalSpacing = 160;
  const verticalSpacing = 110;

  let leafCounter = 0;
  const info = {}; // id -> { x, y, label, type, path }

  function makeId(path) {
    return path.replace(/\W+/g, "_") || "root";
  }

  function dfs(value, path, depth, keyLabel = "") {
    const id = makeId(path);
    const y = depth * verticalSpacing;

    if (isPrimitive(value)) {
      const x = leafCounter * horizontalSpacing;
      leafCounter += 1;

      info[id] = {
        x,
        y,
        label: keyLabel ? `${keyLabel}: ${String(value)}` : String(value),
        type: "primitive",
        path,
      };
      return id;
    }

    if (Array.isArray(value)) {
      const children = [];
      for (let i = 0; i < value.length; i++) {
        const childPath = `${path}[${i}]`;
        const childId = dfs(value[i], childPath, depth + 1, String(i));
        children.push(childId);
      }

      let x;
      if (children.length === 0) {
        x = leafCounter * horizontalSpacing;
        leafCounter += 1;
      } else {
        const xs = children.map((cid) => info[cid].x);
        x = xs.reduce((a, b) => a + b, 0) / xs.length;
      }

      info[id] = {
        x,
        y,
        label: keyLabel ? `${keyLabel}` : "Array",
        type: "array",
        path,
      };

      children.forEach((cid) => {
        edges.push({
          id: `${id}->${cid}`,
          source: id,
          target: cid,
        });
      });

      return id;
    }

    // Object node
    const children = [];
    for (const k of Object.keys(value)) {
      const childPath = `${path}.${k}`;
      const childId = dfs(value[k], childPath, depth + 1, k);
      children.push(childId);
    }

    let x;
    if (children.length === 0) {
      x = leafCounter * horizontalSpacing;
      leafCounter += 1;
    } else {
      const xs = children.map((cid) => info[cid].x);
      x = xs.reduce((a, b) => a + b, 0) / xs.length;
    }

    info[id] = {
      x,
      y,
      label: keyLabel ? `${keyLabel}` : "Object",
      type: "object",
      path,
    };

    children.forEach((cid) => {
      edges.push({
        id: `${id}->${cid}`,
        source: id,
        target: cid,
      });
    });

    return id;
  }

  // DFS start
  const rootId = dfs(rootJson, "$", 0, rootLabel);

  // 🟦 Node color theme
  const nodeColors = {
    object: "#3B82F6", // bright blue
    array: "#10B981", // green
    primitive: "#F59E0B", // amber/orange
  };

  for (const [id, meta] of Object.entries(info)) {
    nodes.push({
      id,
      position: { x: meta.x, y: meta.y },
      data: { label: meta.label, path: meta.path, type: meta.type },
      style: {
        padding: 8,
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        color: "#ffffff",
        textAlign: "center",
        minWidth: 90,
        background: nodeColors[meta.type],
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      },
    });
  }

  const finalEdges = edges.map((e) => ({
    ...e,
    type: "smoothstep",
    animated: false,
    style: { stroke: "#c9c9c9" },
  }));

  return { nodes, edges: finalEdges, rootId };
}
