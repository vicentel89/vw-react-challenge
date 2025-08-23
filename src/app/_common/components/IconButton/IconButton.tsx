import clsx from "clsx";
import { ReactElement, ButtonHTMLAttributes } from "react";

import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
  "aria-label": string;
}

export function IconButton({
  icon,
  className,
  "aria-label": ariaLabel,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={clsx(styles.iconButton, className)}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </button>
  );
}
