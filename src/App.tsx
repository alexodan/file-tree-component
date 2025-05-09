import { useState } from "react";
import { type File, filetree } from "./constants.ts";
import "./index.css";

function Node(props: {
  node: File;
  isOpen: boolean;
  onToggleExpand: () => void;
}) {
  const { node, isOpen, onToggleExpand } = props;

  const toggleExpand = () => {
    onToggleExpand();
  };

  return (
    <li className={node.type === "folder" ? "folder" : "file"}>
      {node.type === "folder" && node.nodes ? (
        <button
          // aria-active, aria-expanded
          aria-label={isOpen ? "close" : "open"}
          onClick={toggleExpand}
          className={`btn ${isOpen ? "opened" : "closed"}`}
        >
          ▶︎
        </button>
      ) : null}
      <span className="file-name">
        🗃️ {node.name}.{node.type}
      </span>
    </li>
  );
}

function TreeView({
  tree,
  defaultOpen,
}: {
  tree: File[];
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

  const handleToggleExpand = () => {
    setIsOpen((op) => !op);
  };

  console.log("treeview");

  return (
    <ul className={`folder${isOpen ? "-open" : ""}`}>
      {tree.map((node) => {
        if (node.type === "folder") {
          return (
            <>
              <Node
                node={node}
                isOpen={isOpen}
                onToggleExpand={handleToggleExpand}
              />
              {/* TODO: check if doing <Node><TreeView/></Node> could work out to fix the styles */}
              <TreeView tree={node.nodes ?? []} />
            </>
          );
        }
        return (
          <Node
            node={node}
            isOpen={isOpen}
            onToggleExpand={handleToggleExpand}
          />
        );
      })}
    </ul>
  );
}

function App() {
  return (
    <>
      <TreeView tree={filetree} defaultOpen />
    </>
  );
}

export default App;
