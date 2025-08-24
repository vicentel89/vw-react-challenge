import { ImSpinner8 } from "react-icons/im";

import styles from "./Loader.module.css";

interface LoaderProps {
  size?: LoaderSize;
}

type LoaderSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMapping: Record<LoaderSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export default function Loader({ size = "md" }: LoaderProps) {
  const iconSize = sizeMapping[size];

  return (
    <div className={styles.container} role="status" aria-label="Loading">
      <ImSpinner8
        className={styles.spinner}
        size={iconSize}
        aria-hidden="true"
      />
      <span className={styles.screenReaderOnly}>Loading...</span>
    </div>
  );
}
