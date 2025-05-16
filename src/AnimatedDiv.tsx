import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  start: {};
  end: {};
}> &
  React.HTMLAttributes<HTMLDivElement>;

export function AnimatedDiv(props: Props) {
  const { start, end, children, ...rest } = props;

  return (
    <div
      {...rest}
      style={{
        ...rest.style,
        ...start,
      }}
    >
      {children}
    </div>
  );
}
