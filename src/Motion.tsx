import { PropsWithChildren, useEffect, useRef, useState } from "react";

type Props = PropsWithChildren<{
  id: string;
  isOpen: boolean;
}>;

export function Motion(props: Props) {
  const { id, children, isOpen } = props;
  const [height, setHeight] = useState<number | undefined>(0);
  const treeRef = useRef<HTMLDivElement>(null);
  const [animationEnded, setAnimationEnded] = useState(false);

  const isChildrenVisible = isOpen || !animationEnded;

  useEffect(() => {
    setAnimationEnded(false);
  }, [isOpen]);

  //opens
  useEffect(() => {
    const child = treeRef.current?.children[0];
    const newHeight = child?.getBoundingClientRect().height;
    if (child && height === 0 && newHeight && isOpen) {
      setHeight(newHeight);
    }
  }, [isOpen, height]);

  // close
  useEffect(() => {
    if (isChildrenVisible && height === undefined && !isOpen) {
      const child = treeRef.current?.children[0];
      const newHeight = child?.getBoundingClientRect().height;
      setHeight(newHeight);
      setTimeout(() => {
        setHeight(0);
      }, 100);
    }
  }, [height, isOpen, isChildrenVisible]);

  if (id === "src") {
    console.log(height);
  }

  return (
    <div
      className="tree-wrap"
      ref={treeRef}
      style={{
        height,
      }}
      onTransitionEnd={(e) => {
        if (e.propertyName === "height") {
          if (isOpen) {
            setHeight(undefined);
          }
          setAnimationEnded(true);
        }
      }}
    >
      {isChildrenVisible && children}
    </div>
  );
}
