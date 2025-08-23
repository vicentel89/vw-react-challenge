import clsx from "clsx";
import { ReactNode } from "react";

import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}
