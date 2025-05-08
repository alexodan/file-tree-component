export type File = {
  name: string;
  type: string;
  nodes?: File[];
};

export const filetree: File[] = [
  {
    name: "src",
    type: "folder",
    nodes: [
      {
        name: "assets",
        type: "folder",
        nodes: [
          {
            name: "react",
            type: "svg",
          },
        ],
      },
      {
        name: "public",
        type: "folder",
        nodes: [
          {
            name: "some-icon",
            type: "jpg",
          },
          {
            name: "image1",
            type: "png",
          },
          {
            name: "image2",
            type: "png",
          },
          {
            name: "image3",
            type: "png",
          },
        ],
      },
    ],
  },
  {
    name: "package",
    type: "json",
  },
  {
    name: "readme",
    type: "md",
  },
];
