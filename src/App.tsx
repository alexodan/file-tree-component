import { useState } from "react";
import { filetree } from "./constants.ts";
import { Node } from "./TreeNode.tsx";
import { isFolder } from "./utils.ts";
import { TreeItem } from "./types.ts";

import "./index.css";
import { Motion } from "./Motion.tsx";

export type TreeViewProps = {
  tree: TreeItem[];
  defaultOpen?: boolean;
};

function TreeView({ tree }: TreeViewProps) {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});

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
        if (isFolder(node)) {
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
              <Motion id={node.name} isOpen={isOpen[node.name]}>
                <TreeView tree={node.nodes ?? []} />
              </Motion>
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
