import { File, Folder, TreeItem } from "./types";

export function isFolder(node: TreeItem): node is Folder {
  return node.type === "folder" ? true : false;
}

export function isFile(node: TreeItem): node is File {
  return node.type !== "folder" ? true : false;
}
