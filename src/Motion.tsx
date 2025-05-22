import { PropsWithChildren, useEffect, useRef, useState } from "react";

type Props = PropsWithChildren<{
  id: string;
  isOpen: boolean;
}>;

export function Motion(props: Props) {
  const { id, children, isOpen } = props;
  const [height, setHeight] = useState(0);
  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const child = treeRef.current?.children[0];
    const height = child?.getBoundingClientRect().height;
    if (height && isOpen) {
      setHeight(height);
    }
  }, [isOpen]);

  if (id === "src") {
    console.log(height);
  }

  return (
    <div
      className="tree-wrap"
      ref={treeRef}
      style={{
        height: !isOpen ? 0 : height,
      }}
      // there is no transition happening that's why this doesnt trigger
      // for a fraction put the height back on close
      onTransitionEnd={(e) => {
        // e.stopPropagation
        if (e.propertyName === "height") {
          if (id === "src") {
            console.log("end", e);
          }
          //   setHeight(undefined);
          // before transition
          if (isOpen) {
            setHeight(undefined);
          }
        }
      }}
    >
      {isOpen ? children : null}
    </div>
  );
}
