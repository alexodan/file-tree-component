import { useState } from "react";
import { type File, filetree } from "./constants.ts";
import "./index.css";

function Node(props: { node: File }) {
  const { node } = props;
  const type = node.type;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((p) => !p);
  };

  return type === "folder" ? (
    <li className="folder">
      <button
        // aria-active, aria-expanded
        aria-label={isExpanded ? "close" : "open"}
        onClick={toggleExpand}
        className={`btn ${isExpanded ? "opened" : "closed"}`}
      >
        ▶︎
      </button>
      <span className="file-name">📁 {node.name}</span>
      {isExpanded && (
        <ul>
          {node.nodes?.map((n) => (
            <Node key={n.name} node={n} />
          ))}
        </ul>
      )}
    </li>
  ) : (
    <li className="file">
      <span className="file-name">
        🗃️ {node.name}.{node.type}
      </span>
    </li>
  );
}

function TreeView({ tree }: { tree: File[] }) {
  return (
    <ul className="tree-root">
      {tree.map((node) => {
        return <Node key={node.name} node={node} />;
      })}
    </ul>
  );
}

function App() {
  return (
    <>
      <TreeView tree={filetree} />
    </>
  );
}

export default App;
