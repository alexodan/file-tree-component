import { useEffect, useRef, useState } from "react";
import { filetree } from "./constants.ts";
import { Node } from "./TreeNode.tsx";
import { isFolder } from "./utils.ts";
import { TreeItem } from "./types.ts";

import "./index.css";

export type TreeViewProps = {
  tree: TreeItem[];
  defaultOpen?: boolean;
};

function TreeView({ tree }: TreeViewProps) {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const [isAnimationInProgress, setIsAnimationInProgress] = useState(false);
  const animationRef = useRef<number>(null);

  const handleToggleExpand = (id: string) => {
    console.log("toggle expand");
    setIsOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setIsAnimationInProgress(true);
    animationRef.current = setInterval(() => {
      setIsAnimationInProgress(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return (
    <ul className="tree">
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
              <div
                className="tree-wrap"
                // style={{
                //   height: isOpen[node.name]
                //     ? `${(node.nodes?.length ?? 0) * 20}px`
                //     : "0",
                // }}
                data-is-closed={!isOpen[node.name]}
                data-is-animating={isOpen[node.name] && isAnimationInProgress}
                data-is-open={isOpen[node.name] && !isAnimationInProgress}
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
