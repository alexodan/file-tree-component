import { PropsWithChildren, useState } from "react";
import { type File, filetree } from "./constants.ts";
import "./index.css";

// TODO: Add Generics to add onToggleExpand based on node type
type NodeProps = PropsWithChildren<{
  node: File;
  isOpen: boolean;
  onToggleExpand?: () => void;
}>;

function Node(props: NodeProps) {
  const { children, node, isOpen, onToggleExpand } = props;

  return (
    <li className={node.type === "folder" ? "folder" : "file"}>
      {node.type === "folder" ? (
        <button
          // aria-active, aria-expanded
          aria-label={isOpen ? "close" : "open"}
          onClick={() => onToggleExpand?.()}
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
  // const [isOpen, setIsOpen] = useState(defaultOpen ?? false);
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  console.log(isOpen);

  const handleToggleExpand = (id: string) => {
    // setIsOpen((op) => !op);
    setIsOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ul className={`tree`}>
      {tree.map((node) => {
        if (node.type === "folder") {
          return (
            <Node
              key={node.name}
              node={node}
              isOpen={isOpen[node.name]}
              onToggleExpand={() => handleToggleExpand(node.name)}
            >
              <span className="file-name">
                🗂️ {node.name} {`(${node.nodes?.length ?? 0})`}
              </span>
              <div
                className="tree-wrap"
                style={{
                  height: isOpen[node.name]
                    ? `${(node.nodes?.length ?? 0) * 20}px`
                    : "0",
                }}
                // pass inlines
              >
                {isOpen[node.name] && <TreeView tree={node.nodes ?? []} />}
              </div>
            </Node>
          );
        }
        return (
          <Node key={node.name} node={node} isOpen={isOpen[node.name]}>
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
