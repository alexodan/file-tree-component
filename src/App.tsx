import { PropsWithChildren, useState } from "react";
import { type File, filetree } from "./constants.ts";
import "./index.css";

type NodeProps = PropsWithChildren<{
  node: File;
  isOpen: boolean;
  onToggleExpand: () => void;
}>;

function Node(props: NodeProps) {
  const { children, node, isOpen, onToggleExpand } = props;

  return (
    <li className={node.type === "folder" ? "folder" : "file"}>
      {node.type === "folder" ? (
        <button
          // aria-active, aria-expanded
          aria-label={isOpen ? "close" : "open"}
          onClick={() => onToggleExpand()}
          className={`btn ${isOpen ? "opened" : "closed"}`}
        >
          ▶︎
        </button>
      ) : null}
      {children}
    </li>
  );
}

export type TreeViewProps = {
  tree: File[];
  defaultOpen?: boolean;
};

function TreeView({ tree, defaultOpen }: TreeViewProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

  const handleToggleExpand = () => {
    setIsOpen((op) => !op);
  };

  return (
    <ul className={`tree`}>
      {tree.map((node) => {
        if (node.type === "folder") {
          return (
            <>
              <Node
                node={node}
                isOpen={isOpen}
                onToggleExpand={handleToggleExpand}
              >
                <span className="file-name">
                  🗂️ {node.name} {`(${node.nodes?.length ?? 0})`}
                </span>
                {isOpen && <TreeView tree={node.nodes ?? []} />}
              </Node>
            </>
          );
        }
        return (
          <Node node={node} isOpen={isOpen} onToggleExpand={handleToggleExpand}>
            <span className="file-name">
              🗃️ {node.name}.{node.type}
            </span>
          </Node>
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
