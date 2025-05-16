import { PropsWithChildren } from "react";
import { Folder, TreeItem } from "./types";

type NodeProps<T extends TreeItem> = PropsWithChildren<
  {
    node: T;
    isOpen: boolean;
  } & (T extends Folder
    ? {
        onToggleExpand: () => void;
      }
    : { onToggleExpand?: never })
>;

export function TreeNode<T extends TreeItem>(props: NodeProps<T>) {
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
