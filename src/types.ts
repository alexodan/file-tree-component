export type File = {
  name: string;
  type: string;
  nodes?: never;
};

export type Folder = {
  name: string;
  type: "folder";
  nodes: Array<File | Folder>;
};

export type TreeItem = File | Folder;
