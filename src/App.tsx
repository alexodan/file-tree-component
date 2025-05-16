import { useEffect, useRef, useState } from "react";
import { filetree } from "./constants.ts";
import { TreeNode } from "./TreeNode.tsx";
import { isFolder } from "./utils.ts";
import { TreeItem } from "./types.ts";
// import { AnimatedDiv } from "./AnimatedDiv.tsx";

import "./index.css";

export type TreeViewProps = {
  tree: TreeItem[];
  defaultOpen?: boolean;
  // animation stuff
  animateStyles?: Record<string, string>;
  className?: string;
};

function TreeView({ tree, className, animateStyles }: TreeViewProps) {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  // animation ref
  // const treeRef = useRef<HTMLUListElement>(null);

  const handleToggleExpand = (id: string) => {
    console.log("toggle expand");
    setIsOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // initial={exitingState}
  // animate={enteringState}
  // exit={exitingState}

  return (
    <ul className={className} style={animateStyles}>
      {tree.map((node) => {
        const animateStyles = {
          "--start": "0px",
          "--end": "auto",
          "--animate": `${(node.nodes?.length ?? 0) * 21.14}px`,
        };
        if (isFolder(node)) {
          return (
            <TreeNode
              key={node.name}
              node={node}
              isOpen={isOpen[node.name]}
              onToggleExpand={() => handleToggleExpand(node.name)}
            >
              <span className="file-name">
                🗂️ {node.name} {`(${node.nodes?.length ?? 0})`}
              </span>
              {isOpen[node.name] && (
                <TreeView
                  className={`tree-wrap ${isOpen ? "open" : ""}`}
                  tree={node.nodes ?? []}
                  animateStyles={animateStyles}
                />
              )}
            </TreeNode>
          );
        }
        return (
          <TreeNode key={node.name} node={node} isOpen={isOpen[node.name]}>
            <span className="file-name">
              🗃️ {node.name}.{node.type}
            </span>
          </TreeNode>
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
